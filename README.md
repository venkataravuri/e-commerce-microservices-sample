# E-Commerce Sample App using Microservices Architecture
**_A fictitious cloud-native e-commerce sample application using micro-services architecture powered by Spring Cloud, Docker, React.JS, MongoDB, Redis and more._**

This sample e-commerce application demonstrates how to build an application using microservices architecture paradigm with Polyglot Languages (Java, JavaScript) & Polyglot Persistance software (MongoDB, Redis). This sample application includes following functional microservices & infrastructure microservices. All of these microservices are independently deployable applications and are organized around business capabilities.

The functional microservices 

#Functional Microservices
* **Product Catalog Microservice**
* **Cart Microservice**
* ~~Order Management Microservice~~ [TODO]
* ~~Inventory Microervice~~ [TODO]
* ~~Pricing Microservice~~ [TODO]

#Infrastructure Microservices
* **Global Configuration Microservice**
* **Service Registration & Discovery Miroservice**
* ~~API Gateway~~ [TODO]

The application is setup as multi-level project where each microservice is arranged as a sub-module under single parent project. It enables to run each microservice individually.

###Prerequisites
* **_JDK 8_** - Install JDK 1.8 version from, http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* **_Gradle [Optional]_** - Download latest version of Gradle from https://gradle.org/gradle-download/ (binary distribution is good enough) and configure your machine with Gradle as specified at, https://docs.gradle.org/current/userguide/installation.html
* **_Docker Toolbox_** - Install Docker Toolbox on your machine from, https://www.docker.com/products/docker-toolbox
* **_Node.js_** - Install Node.js from, https://nodejs.org/en/download/
* **_IntelliJ IDEA Community Edition [Optional]_** - Install IntelliJ IDEA Community Edition from, https://www.jetbrains.com/idea/#chooseYourEdition

###Installation
#### Clone Repository
Clone source code of this repository by executing following instruction to any folder on your machine,
```
git clone https://github.com/venkataravuri/e-commerce-microservices-sample.git
cd e-commerce-microservices-sample
```
#### Building Application
##### Building Microservices
[Gradle](https://gradle.org/getting-started-gradle/) has been used as a build tool to build Spring Boot based Microservices applications. Issue following command on your terminal/console window,
```
gradlew build
```
This command might take a while for first time as it needs to download serveral dependency libraries from Maven repository. This command will build & package all microservice applications.
##### Building Docker Containers & Run Containers
Upon successful building of microservices, you can now build Docker images and run containers Docker host on your machine,
**Note**: Prior to execute below instructions, ensure you have started '**_Docker Quickstart Terminal_**'. If you are new to docker, read more about Docker at, https://docs.docker.com/engine/getstarted/
Excute below commands in sequence on '_Docker Quickstart Terminal_',
```
cd <Replace this with e-commerce-microservices-sample folder path>
docker-compose build --no-cache
```
Above command may take time for first time, as it needs to download base images. All docker containers are based on light-weight LinuxOS called '**_Alpine Linux_**', which is hardly ~5MB. 

Issue following command, to run Docker containers,
```
docker-compose up
```

##### Building Frontend App (React.JS)

##Prodcut Catalog Microservice

### Overview
Product Catalog Microservice managed product catalog of e-commerce application. This microservice is built as Spring Boot application with MongoDB as persistance store for product information.

Product Catalog REST API supports following opertations,
Method | URI | Description | Parameters | Request JSON | Response JSON
--- | --- | --- | --- | --- | ---
`GET` | */products/recommendations* | List of recommended products | None | None |

