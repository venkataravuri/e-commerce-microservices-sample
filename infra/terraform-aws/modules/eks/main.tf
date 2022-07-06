#---------------------------------------------------
# Creating EKS Cluster
# ---------------------------------------------------
data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "${var.project}-eks"
  cluster_version = "1.22"
  subnet_ids     = [var.public_subnet_1_id.id, var.private_subnet_1_id.id]
  vpc_id          = var.vpc_id

  self_managed_node_groups = {
    public = {
      subnets          = [var.public_subnet_1_id.id]
      desired_capacity = 1
      max_capacity     = 1
      min_capacity     = 1

      instance_type = var.instance_type
      k8s_labels = {
        Environment = "public"
      }
    }
    private = {
      subnets          = [var.private_subnet_1_id.id]
      desired_capacity = 1
      max_capacity     = 1
      min_capacity     = 1

      instance_type = var.instance_type
      k8s_labels = {
        Environment = "private"
      }
    }
  }

}
