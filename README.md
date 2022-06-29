# Sample E-Commerce app using Microservices & CNA Architecture
**_A fictitious e-commerce sample application using Microservices aka. Cloud Native Architecture (CNA) poweredby by Spring Cloud, Docker, Kubernetes, React.JS, MongoDB, Redis and more._**

This sample end-to-end e-commerce solution demonstrates how to build an CNA appliation using microservices architecture with Polyglot Languages (Java, JavaScript/TypeScrpt, Python) & Polyglot Databases (MongoDB, Redis, MySQL, ElasticSearch). 

This sample application includes following functional microservices & platform services. All of these microservices are independently deployable applications and are organized around business capabilities.

## Functional Microservices
* **Product Catalog Microservice**
* **Shopping Cart Microservice**
* **User Profile Microservice**
* **Product Search Microservice**

## Infrastructure
This solution can be deployed locally on your machine and also to AWS.

Local deployment uses Kubernetes (Minikube)

AWS deployment is done through Terraform scripts.

## Appliction Folder Structure


Tell Docker CLI to talk to minikube's VM.

For MacOS,
`eval $(minikube docker-env)`

For Windows,
`& minikube -p minikube docker-env --shell powershell | Invoke-Expression`
