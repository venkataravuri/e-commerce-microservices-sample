#-------------------------------------------
# Declare the VPC details
#-------------------------------------------
variable "availability_zones" {
  description = "Availability zones for multi-zone deployment"
  type        = list(string)
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
}

variable "project" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "public_subnet_1_id" {
}

variable "private_subnet_1_id" {
}