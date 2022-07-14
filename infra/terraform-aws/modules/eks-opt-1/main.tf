
resource "aws_iam_policy" "alb-ingress" {
  name   = "alb-ingress-policy"
  policy = file("${path.module}/iam-policy.json")
}
resource "aws_iam_role" "eks-cluster-iam-role" {
  name = "${var.project}-eks-cluster-iam-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
                "StringNotEquals": {
                    "aws:PrincipalARN": "iam:DeleteRolePermissionsBoundary"
                }
            }
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "eks-cluster-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks-cluster-iam-role.name
}

resource "aws_iam_role_policy_attachment" "eks-cluster-AmazonEKSServicePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
  role       = aws_iam_role.eks-cluster-iam-role.name
}

resource "aws_security_group" "eks-cluster-sg" {
  name        = "${var.project}-eks-cluster-sg"
  description = "Cluster communication with worker nodes"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      var.private_subnet_1_id.cidr_block
    ]
  }
}

resource "aws_eks_cluster" "main" {
  name     = "${var.project}-eks-cluster"
  role_arn = aws_iam_role.eks-cluster-iam-role.arn

  vpc_config {
    security_group_ids      = [aws_security_group.eks-cluster-sg.id]
    subnet_ids              = [var.private_subnet_1_id.id]
    endpoint_private_access = true
    endpoint_public_access  = false
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks-cluster-AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.eks-cluster-AmazonEKSServicePolicy,
  ]
}

resource "aws_iam_role" "eks-cluster-node-role" {
  name = "${var.project}-eks-cluster-node-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "eks-cluster-node-role-AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks-cluster-node-role.name
}

resource "aws_iam_role_policy_attachment" "eks-cluster-node-role-AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks-cluster-node-role.name
}

resource "aws_iam_role_policy_attachment" "eks-cluster-node-role-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks-cluster-node-role.name
}

resource "aws_iam_role_policy_attachment" "eks-cluster-node-role-AmazonEC2FullAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
  role       = aws_iam_role.eks-cluster-node-role.name
}

resource "aws_iam_role_policy_attachment" "eks-cluster-node-role-alb-ingress_policy" {
  policy_arn = aws_iam_policy.alb-ingress.arn
  role       = aws_iam_role.eks-cluster-node-role.name
}


resource "aws_iam_instance_profile" "eks-cluster-inst-profile" {
  name = "${var.project}-eks-cluster-inst-profile"
  role = aws_iam_role.eks-cluster-node-role.name
}

resource "aws_security_group" "eks-cluster-node-sg" {
  name        = "${var.project}-eks-cluster-node-sg"
  description = "Security group for all nodes in the cluster"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "eks-cluster-node-ingress-self" {
  type              = "ingress"
  description       = "Allow node to communicate with each other"
  from_port         = 0
  protocol          = "-1"
  security_group_id = aws_security_group.eks-cluster-node-sg.id
  to_port           = 65535
  cidr_blocks = [
    var.private_subnet_1_id.cidr_block
  ]
}

resource "aws_security_group_rule" "eks-cluster-node-ingress-cluster" {
  type                     = "ingress"
  description              = "Allow worker Kubelets and pods to receive communication from the cluster control plane"
  from_port                = 1025
  protocol                 = "tcp"
  security_group_id        = aws_security_group.eks-cluster-node-sg.id
  source_security_group_id = aws_security_group.eks-cluster-sg.id
  to_port                  = 65535
}

locals {
  main-node-userdata = <<USERDATA
#!/bin/bash
set -o xtrace
/etc/eks/bootstrap.sh --apiserver-endpoint '${aws_eks_cluster.main.endpoint}' --b64-cluster-ca '${aws_eks_cluster.main.certificate_authority.0.data}' '${var.project}-eks-cluster'
USERDATA
}

data "aws_ami" "eks-worker" {
  filter {
    name   = "name"
    values = ["amazon-eks-node-${aws_eks_cluster.main.version}-v*"]
  }

  most_recent = true
  owners      = ["602401143452"] # Amazon EKS AMI Account ID
}

resource "aws_launch_configuration" "main" {
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.eks-cluster-inst-profile.name
  image_id                    = data.aws_ami.eks-worker.id
  instance_type               = "t3.small"
  name_prefix                 = "terraform-eks-main"
  security_groups             = [aws_security_group.eks-cluster-node-sg.id]
  user_data_base64            = base64encode(local.main-node-userdata)

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "main" {
  desired_capacity     = 1
  launch_configuration = aws_launch_configuration.main.id
  max_size             = 1
  min_size             = 1
  name                 = "terraform-eks-main"
  vpc_zone_identifier  = [var.private_subnet_1_id.id]
}
# module "eks" {
#   source = "terraform-aws-modules/eks/aws"

#   cluster_name    = "${var.project}-eks-cluster"
#   cluster_version = "1.22"

#   cluster_endpoint_private_access = true
#   cluster_endpoint_public_access  = false

#   # TODO in future 
#   #   cluster_encryption_config = [{
#   #     provider_key_arn = "arn:aws:kms:eu-west-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab"
#   #     resources        = ["secrets"]
#   #   }]

#   vpc_id     = var.vpc_id
#   subnet_ids = [var.public_subnet_1_id.id, var.private_subnet_1_id.id]

#   self_managed_node_group_defaults = {
#     instance_types                         = var.instance_types
#     update_launch_template_default_version = true
#     iam_role_additional_policies = [
#       "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
#     ]
#   }

#   # Self Managed Node Group(s)
#   self_managed_node_groups = {
#     public = {
#       name         = "${var.project}-k8s-public"
#       subnets      = [var.public_subnet_1_id.id]
#       desired_size = 1
#       max_size     = 1
#       min_size     = 1

#       k8s_labels = {
#         Environment = "public"
#       }
#     }
#     private = {
#       name         = "${var.project}-k8s-private"
#       subnets      = [var.private_subnet_1_id.id]
#       desired_size = 1
#       max_size     = 1
#       min_size     = 1

#       k8s_labels = {
#         Environment = "private"
#       }
#     }

#     # depends_on = [
#     #   "aws_iam_role_policy_attachment.eks-cluster-AmazonEKSClusterPolicy",
#     #   "aws_iam_role_policy_attachment.eks-cluster-AmazonEKSServicePolicy",
#     # ]
#   }

# }

data "aws_eks_cluster" "eks-cluster" {
  name = aws_eks_cluster.main.id
}

data "aws_eks_cluster_auth" "eks-cluster" {
  name = aws_eks_cluster.main.id
}

output "token" {
  value = data.aws_eks_cluster_auth.eks-cluster.token
}
