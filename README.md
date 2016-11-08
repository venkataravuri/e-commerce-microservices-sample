# E-Commerce Microservices Sample Application
**_A fictitious cloud-native e-commerce sample application using micro-services architecture powered by Spring Cloud, Docker, React.JS, MongoDB, Redis and more._**

This sample e-commerce application demonstrates how to build an application using microservices architecture paradigm. This sample application includes following functional microservices & infrastructure microservices. All of these microservices are independently deployable applications and are organized around business capabilities.

#Functional Services
* **Product Catalog Microservice**
* **Cart Microservice**
* ~~Order Management Microservice~~ [TODO]
* ~~Inventory Microervice~~ [TODO]
* ~~Pricing Microservice~~ [TODO]

#Infrastructure Services
* **Global Configuration Microservice**
* **Service Registration & Discovery Miroservice**
* ~~API Gateway~~ [TODO]

The application is setup as multi-level project where each microservice is arranged as a sub-module under single parent project. It enables to run each microservice individually.

###Prerequisites
* **_JDK 8_** - Install JDK 1.8 version from, http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* **_Gradle_** - Download latest version of Gradle from https://gradle.org/gradle-download/ (binary distribution is good enough) and configure your machine with Gradle as specified at, https://docs.gradle.org/current/userguide/installation.html
* **_Docker Toolbox_** - Install Docker Toolbox on your machine from, https://www.docker.com/products/docker-toolbox
* **_Node.js_** - Install Node.js from, https://nodejs.org/en/download/
* **_IntelliJ IDEA Community Edition [Optional]_** - Install IntelliJ IDEA Community Edition from, https://www.jetbrains.com/idea/#chooseYourEdition

###Installation

##Prodcut Catalog Service

Product Catalog REST API supports following opertations,

Method | URI | Description | Parameters | Request JSON | Response JSON
--- | --- | --- | --- | --- | ---
`GET` | */products/recommendations* | List of recommended products | None | None |

