output "eks_cluster_id" {
  value = module.eks.cluster_id
}
output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}
output "eks_cluster_ca" {
  value = module.eks.cluster_certificate_authority_data
}
output "eks_provider_arn" {
  value = module.eks.oidc_provider_arn
}