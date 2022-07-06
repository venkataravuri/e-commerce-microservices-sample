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
