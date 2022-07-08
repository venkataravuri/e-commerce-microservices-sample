#---------------------------------------
# Declare the project details
#---------------------------------------
variable "project" {
  type    = string
  default = "e-commerce"
}

#-------------------------------------------
# Declare the VPC details
#-------------------------------------------
variable "region" {
  type    = string
  default = "ap-south-1"
}

variable "environment" {
    type = string
    description = "Options: development, qa, staging, production"
    default = "staging"
}

variable "cidr_ab" {
  type = map(any)
  default = {
    staging    = "10.0"
    production = "10.1"
  }
}

locals {
  availability_zones = ["${var.region}a", "${var.region}b"]
}

locals {
  vpc_cidr = "${lookup(var.cidr_ab, var.environment)}.0.0/16"
}

locals {
  cidr_c_public_subnets  = 11
  cidr_c_private_subnets = 22
}

locals {
    public_subnets_cidr = [
    for az in local.availability_zones :
    "${lookup(var.cidr_ab, var.environment)}.${local.cidr_c_public_subnets + index(local.availability_zones, az)}.0/24"
  ]
  private_subnets_cidr = [
    for az in local.availability_zones :
    "${lookup(var.cidr_ab, var.environment)}.${local.cidr_c_private_subnets + index(local.availability_zones, az)}.0/24"
  ]
}
