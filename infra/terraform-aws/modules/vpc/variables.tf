#-------------------------------------------
# Declare the VPC details
#-------------------------------------------
variable "availability_zones" {
  type = list(string)
}

variable "vpc_cidr" {
  type = string
}

variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "region" {
  type = string
}
variable "public_subnets_cidr" {
  type = list(string)
}

variable "private_subnets_cidr" {
  type = list(string)
}
