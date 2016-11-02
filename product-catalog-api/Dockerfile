FROM anapsix/alpine-java:8_jdk_unlimited
MAINTAINER Venkata Ravuri <venkat@nikhu.com>

ADD ./build/libs/product-catalog-api-0.0.1-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/product-catalog-api-0.0.1-SNAPSHOT.jar"]

EXPOSE 2222