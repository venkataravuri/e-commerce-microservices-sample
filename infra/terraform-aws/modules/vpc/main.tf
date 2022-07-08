resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = "true" # Gives you an internal domain name
  enable_dns_hostnames = "true" # Gives you an internal host name
  enable_classiclink   = "false"
  instance_tenancy     = "default"
  tags = {
    Name        = "${var.project}-vpc"
    Terraform   = "true"
    Environment = "staging"
  }
}

output "vpc_id" {
  value = aws_vpc.vpc.id
}

# map_public_ip_on_launch: 
# If it is true, it will be a public subnet, otherwise private.
#  The only difference between private and public subnet is this line.

# Create a subnet in each availability zone in the VPC.
resource "aws_subnet" "public_subnets" {
  count                   = length(var.availability_zones)
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.public_subnets_cidr[count.index]
  map_public_ip_on_launch = "true" //it makes this a public subnet
  availability_zone       = var.availability_zones[count.index]
  tags = {
    Name        = "${var.project}-public-subnet-${count.index}"
    Terraform   = "true"
    Environment = "${var.environment}"
  }
}

output "public_subnets" {
  value = aws_subnet.public_subnets
}

# ---------------------------------------------------
# Subnet Private subnets
# ---------------------------------------------------

resource "aws_subnet" "private_subnets" {
  count                   = length(var.availability_zones)
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.private_subnets_cidr[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = false
  tags = {
    Name        = "${var.project}-private-subnet-${count.index}"
    Terraform   = "true"
    Environment = "${var.environment}"
  }
}

output "private_subnets" {
  value = aws_subnet.private_subnets
}
