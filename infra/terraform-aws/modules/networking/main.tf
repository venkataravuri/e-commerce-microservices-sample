# Enables vpc to connect to the internet
resource "aws_internet_gateway" "igw" {
  vpc_id = var.vpc_id
  tags = {
    Name        = "${var.project}-igw"
    Terraform   = "true"
    Environment = "${var.environment}"
  }
}

/* Elastic IP for NAT */
resource "aws_eip" "nat" {
  vpc        = true
  depends_on = [aws_internet_gateway.igw]
}

# ---------------------------------------------------
# Creating NAT gateway
# ---------------------------------------------------
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = var.public_subnets[0].id

  tags = {
    Name = "${var.project}-nat"
  }
}

# Create a custom route table for public subnet. public subnet can reach to the internet by using this.
resource "aws_route_table" "public-crt" {
  vpc_id = var.vpc_id

  route {
    //associated subnet can reach everywhere
    cidr_block = "0.0.0.0/0" //CRT uses this IGW to reach internet
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.project}-public-crt"
  }
}

# ---------------------------------------------------
# Private Route table
# ---------------------------------------------------
resource "aws_route_table" "private-crt" {

  vpc_id = var.vpc_id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "${var.project}-private"
  }
}


# Associate CRT and Subnet
resource "aws_route_table_association" "public-crt-public-subnet" {
  count          = length(var.availability_zones)
  subnet_id      = var.public_subnets[count.index].id
  route_table_id = aws_route_table.public-crt.id
}

# ---------------------------------------------------
# Route table Association private - ? subnet
# ---------------------------------------------------

resource "aws_route_table_association" "private-crt-private-subnet" {
  count          = length(var.availability_zones)
  subnet_id      = var.private_subnets[count.index].id
  route_table_id = aws_route_table.private-crt.id
}

resource "aws_key_pair" "bastion-key" {
  key_name   = "bastion-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC2JE1F2oDin8bH9W6OkpbnbHkS9X5TN5JuycvYmXyxIeOnGZwcm2pSQ+yf/9x/ihOfcXbtejKDz1VxTmyCFD6sKc135z/Ki2l+QCMLCme0eDLwm/pjjeBqB1R7uzgwhctyJoTD7O5khl5vc7jKaRmnO71i6UgpruWz/FlCDghqWvShKwSlySCID6Krrge1K8N768SO6/7SUaMyv/qjqRi5ZfbxoMHNJXb9p+UxYW8S2EdS5U/E4zz9yOwS8YCotoQEhvlqFTwSpTNIjcOHRpj6lR8n+kvEyogtgYoUyKseqdBX4u35pDjlZrUZf9nQNTiuGmwKUMVknJPka5iSWkOoVQuaF0pQV1GIDgkkP3zfIZwrPYQ62G+oPeZbYyDDDe1lWLiVjeae/u0ZX3gBiDG3+u0vS1arQd7KueLGMh1mowPuYz8IsmIRzPQI3E7BmlqZtYd4q8X3QyjMWfebuKiGFWH93GOdLW5Ad9nmVSGwYFEcZ7VCoAdp1l0L5iYLxTE= vravuri@vravuri-a01.vmware.com"
}

resource "aws_security_group" "bastionHostSG" {
  vpc_id     = var.vpc_id
  depends_on = [aws_route_table.public-crt]

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Bastion Host"
  }
}

resource "aws_instance" "bastionHost" {
  count                  = length(var.availability_zones)
  ami                    = "ami-08df646e18b182346"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.bastionHostSG.id]
  subnet_id              = var.public_subnets[count.index].id
  key_name               = aws_key_pair.bastion-key.key_name
  depends_on             = [aws_key_pair.bastion-key, aws_security_group.bastionHostSG]

  tags = {
    Name = "Jumper"
  }
}
