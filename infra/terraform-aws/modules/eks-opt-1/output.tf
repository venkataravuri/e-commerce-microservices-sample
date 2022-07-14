output "eks_cluster_id" {
  value = aws_eks_cluster.main.id
}
output "eks_cluster_endpoint" {
  value = aws_eks_cluster.main.endpoint
}
output "eks_cluster_ca" {
  value = aws_eks_cluster.main.certificate_authority.0.data
}
output "eks_provider_arn" {
  value = aws_eks_cluster.main.arn
}