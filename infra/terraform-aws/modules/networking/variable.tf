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

variable "vpc_id" {
  type = string
}

variable "environment" {
  type = string
}

variable "public_subnets" {
}

variable "private_subnets" {
}
