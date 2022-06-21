provider "aws" {
  region = "us-east-2"
}

module "vpc" {
  source          = "../../modules/vpc"
  region          = var.region
  main_vpc_cidr   = var.main_vpc_cidr
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
}
