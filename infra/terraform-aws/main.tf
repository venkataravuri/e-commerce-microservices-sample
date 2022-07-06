
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region  = var.region
  profile = "default"
}

module "vpc" {
  source             = "./modules/vpc"
  project            = var.project
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
}

module "networking" {
  source              = "./modules/networking"
  project             = var.project
  vpc_id              = module.vpc.vpc_id
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  public_subnet_1_id  = module.vpc.public_subnet_1_id
  private_subnet_1_id = module.vpc.private_subnet_1_id
}

module "eks" {
  source              = "./modules/eks"
  project             = var.project
  vpc_id              = module.vpc.vpc_id
  public_subnet_1_id  = module.vpc.public_subnet_1_id
  private_subnet_1_id = module.vpc.private_subnet_1_id
}