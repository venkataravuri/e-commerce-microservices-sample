variable "project" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "public_subnets" {
}

variable "private_subnets" {
}

variable "instance_types" {
    type = list(string)
    default = ["t4g.small"]
}