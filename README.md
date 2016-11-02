# e-commerce-microservices-sample
A fictitious cloud-native e-commerce application using micro-services architecture powered by Spring Cloud, Docker


This sample e-commerce application demonstrates how to build application using microservices architecture pattern. This sample application is decomposed into following functional microservices and infrastructure microservices. All of these microservices are independently deployable applications and organized around business capabilities.

#Functional Services
* Product Catalog Service
* Order Management Service
* Inventory Service
* Pricing Service

#Infrastructure Services
* Global Configuration Service
* Service Registration & Discovery Service
* API Gateway

The application is setup as multi-level project where each microservice is arranged as a sub-module under single parent project. It enables to run each microservice individually.

###Prerequisites
* Gradle - Download latest version of Gradle from https://gradle.org/gradle-download/ (binary distribution is good enough) and configure your machine with Gradle as specified at, https://docs.gradle.org/current/userguide/installation.html



Prodcut Catalog Service

Method | URI | Description | Parameters | Request JSON | Response JSON
--- | --- | --- | --- | --- | ---
`GET` | */products/recommendations* | List of recommended products | None | None | 

