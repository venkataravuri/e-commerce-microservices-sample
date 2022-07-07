variable "eks_cluster_endpoint" {
}

variable "eks_cluster_ca" {
}

variable "project" {
  type = string
}

variable "eks_cluster_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "eks_provider_arn" {
  type = string
}

variable "token" {
  type = string
}

variable "region" {
  default = "ap-south-1"
}