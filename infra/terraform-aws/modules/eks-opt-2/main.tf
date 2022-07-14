
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = "${var.project}-eks-cluster"
  cluster_version = "1.22"

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  # Don't know significance of the below code, need to revisit later
  cluster_addons = {
    coredns = {
      resolve_conflicts = "OVERWRITE"
    }
    kube-proxy = {}
    vpc-cni = {
      resolve_conflicts = "OVERWRITE"
    }
  }

  # TODO in future 
  #   cluster_encryption_config = [{
  #     provider_key_arn = "arn:aws:kms:eu-west-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab"
  #     resources        = ["secrets"]
  #   }]

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnets


  # EKS Managed Node Group(s)
  eks_managed_node_group_defaults = {
    disk_size      = 50
    instance_types = var.instance_types
  }

  eks_managed_node_groups = {
    blue = {}
    green = {
      min_size     = 1
      max_size     = 1
      desired_size = 1

      instance_types = var.instance_types
      # capacity_type  = "SPOT"
    }
  }


}

