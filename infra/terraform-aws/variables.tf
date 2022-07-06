#---------------------------------------
# Declare the project details
#---------------------------------------
variable "region" {
  default = "ap-south-1"
}
variable "project" {
  default = "e-commerce"
}

#-------------------------------------------
# Declare the VPC details
#-------------------------------------------
variable "availability_zones" {
  description = "Availability zones for multi-zone deployment"
  type        = list(any)
  default     = ["ap-south-1a"]
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  default     = "10.0.0.0/16"
}
