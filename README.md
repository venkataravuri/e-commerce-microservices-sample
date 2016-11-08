# Sample E-Commerce App using Microservices Architecture
**_A fictitious cloud-native e-commerce sample application using micro-services architecture powered by Spring Cloud, Docker, React.JS, MongoDB, Redis and more._**

This sample e-commerce application demonstrates how to build an application using microservices architecture paradigm with Polyglot Languages (Java, JavaScript) & Polyglot Persistance software (MongoDB, Redis). This sample application includes following functional microservices & infrastructure microservices. All of these microservices are independently deployable applications and are organized around business capabilities.

###Functional Microservices
* **Product Catalog Microservice**
* **Cart Microservice**
* ~~Order Management Microservice~~ [_TODO_]
* ~~Inventory Microervice~~ [_TODO_]
* ~~Pricing Microservice~~ [_TODO_]

###Infrastructure Microservices
* **Global Configuration Microservice**
* **Service Registration & Discovery Miroservice**
* ~~API Gateway~~ [_TODO_]

![High-level Block Diagram](https://github.com/venkataravuri/e-commerce-microservices-sample/blob/master/drawings.jpg "High-levle Overview Diagram")

The application is setup as multi-level project where each microservice is arranged as a sub-module under single parent project. It enables to run each microservice individually.

##Prerequisites
* **_JDK 8_** - Install JDK 1.8 version from, http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* **_Gradle [Optional]_** - Download latest version of Gradle from https://gradle.org/gradle-download/ (binary distribution is good enough) and configure your machine with Gradle as specified at, https://docs.gradle.org/current/userguide/installation.html
* **_Docker Toolbox_** - Install Docker Toolbox on your machine from, https://www.docker.com/products/docker-toolbox
* **_Node.js_** - Install Node.js from, https://nodejs.org/en/download/
* **_IntelliJ IDEA Community Edition [Optional]_** - Install IntelliJ IDEA Community Edition from, https://www.jetbrains.com/idea/#chooseYourEdition

##Installation
#### Clone Repository
Clone respository source code by executing following instruction to any folder on your machine,
```
git clone https://github.com/venkataravuri/e-commerce-microservices-sample.git
cd e-commerce-microservices-sample
```
###Building Application
#### Building Microservices
[Gradle](https://gradle.org/getting-started-gradle/) has been used as a build tool to build Spring Boot based Microservices applications. Issue following command on your terminal/console window,
```
gradlew build
```
This command might take a while for first time as it needs to download serveral dependency libraries from Maven repository. This command will build & package all microservice applications.
#### Building Docker Containers & Run Containers
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
Above command starts all Microsevices Docker containers as specified in 'docker-compose.yml' file. 
**Important Note**: Some Microservices may not start properly due to interdependcy on infrastructure Microservices' containers. Unfortunately, docker-compose command will NOT wait till dependent containers started. It will start all containers simultaneously. You may need to re-start failed containers manually. I recommend to use '**_Kitematic (Alpha)_**' console shipped with 'Docker Toolbox' to restart failed containers.

You can bring the docker containers down (when needed) using below command,
```
docker-compose down --remove-orphans
```
#### Building Frontend App (React.JS)
Frontend application is a Single Page Appliction built using React.JS library. The source code of this application is available under, '**_ecommerce-app_**' folder. 
Issue following commands in sequence to build & run frontend app,
```
cd ecommerce-app
npm install
npm run start-dev
```
**Note**: 'npm install' command may take a while, as it needs to download all dependent npm modules used by frontend app.

Once above instructions successfully executed, you can view e-commerce application by browsing below URL,
[http://localhost:3333](http://localhost:3333)

##Prodcut Catalog Microservice
#### Overview
Product Catalog Microservice manages e-commerce application's products. This microservice is built as Spring Boot application with MongoDB as persistance store for product information.

#### REST API
Product Catalog REST API supports following opertations,

Method | URI | Description | Parameters | Request JSON | Response JSON
--- | --- | --- | --- | --- | ---
`GET` | */products/recommendations* | List of recommended products | None | _[TODO]_ |
`GET` | */products/{id}* | Fetch product information based on id | None | _[TODO]_ |
`PUT` | */products* | Adds new product | _[TODO]_ | _[TODO]_ |
`POST` | */products/{id}* | Updates existing product | _[TODO]_ | _[TODO]_ |

##Cart Microservice
#### Overview
Cart Microservice provides e-commerce application's shopping cart functionality. This microservice is built as Spring Boot application with Redis as InMemory persistance store for cart information.

#### REST API
Cart REST API supports following opertations,

Method | URI | Description | Parameters | Request JSON | Response JSON
--- | --- | --- | --- | --- | ---
`GET` | */cart/{id}* | Fetches cart by id | None | _[TODO]_ |
`POST` | */cart/{id}* | Creates or updates cart | _[TODO]_ | _[TODO]_ |

