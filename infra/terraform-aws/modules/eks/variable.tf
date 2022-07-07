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

variable "instance_types" {
    type = list(string)
    default = ["t4g.small"]
}