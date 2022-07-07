module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "${var.project}-ek-cluster"
  cluster_version = "1.22"

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = false

  # TODO in future 
  #   cluster_encryption_config = [{
  #     provider_key_arn = "arn:aws:kms:eu-west-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab"
  #     resources        = ["secrets"]
  #   }]

  vpc_id     = var.vpc_id
  subnet_ids = [var.public_subnet_1_id.id, var.private_subnet_1_id.id]

  self_managed_node_group_defaults = {
    instance_types                         = var.instance_types
    update_launch_template_default_version = true
    iam_role_additional_policies = [
      "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
    ]
  }

  # Self Managed Node Group(s)
  self_managed_node_groups = {
    public = {
      name         = "${var.project}-k8s-public"
      subnets      = [var.public_subnet_1_id.id]
      desired_size = 1
      max_size     = 1
      min_size     = 1

      k8s_labels = {
        Environment = "public"
      }
    }
    private = {
      name         = "${var.project}-k8s-private"
      subnets      = [var.private_subnet_1_id.id]
      desired_size = 1
      max_size     = 1
      min_size     = 1

      k8s_labels = {
        Environment = "private"
      }
    }
  }

}

data "aws_eks_cluster" "eks-cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "eks-cluster" {
  name = module.eks.cluster_id
}

output "token" {
  value = data.aws_eks_cluster_auth.eks-cluster.token
}
