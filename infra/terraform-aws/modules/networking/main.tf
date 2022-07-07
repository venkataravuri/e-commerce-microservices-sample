

# Enables vpc to connect to the internet
resource "aws_internet_gateway" "igw" {
  vpc_id = var.vpc_id
  tags = {
    Name        = "${var.project}-igw"
    Terraform   = "true"
    Environment = "staging"
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
  subnet_id     = var.public_subnet_1_id.id

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
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "${var.project}-private"
  }
}


# Associate CRT and Subnet
resource "aws_route_table_association" "public-crt-public-subnet-1" {
  subnet_id      = var.public_subnet_1_id.id
  route_table_id = aws_route_table.public-crt.id
}

# ---------------------------------------------------
# Route table Association private - ? subnet
# ---------------------------------------------------

resource "aws_route_table_association" "private-crt-private-subnet-1" {
  subnet_id      = var.private_subnet_1_id.id
  route_table_id = aws_route_table.private-crt.id
}

resource "aws_security_group" "bastionHostSG" {
  vpc_id = var.vpc_id
  depends_on = [aws_route_table.public-crt]

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name =  "Bastion Host"
  }
}

resource "aws_instance" "bastionHost" {
  ami = "ami-0573b70afecda915d"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.bastionHostSG.id]
  subnet_id = var.public_subnet_1_id.id
  depends_on = [aws_security_group.bastionHostSG]

  tags = {
    Name = "Jumper"
  }
}
