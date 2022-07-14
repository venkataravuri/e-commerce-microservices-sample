data "aws_eks_cluster" "eks-cluster" {
  name = aws_eks_cluster.main.id
}

data "aws_eks_cluster_auth" "eks-cluster" {
  name = aws_eks_cluster.main.id
}

output "token" {
  value = data.aws_eks_cluster_auth.eks-cluster.token
}
