FROM anapsix/alpine-java:8_jdk_unlimited
MAINTAINER Venkata Ravuri <venkat@nikhu.com>

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

ADD ./build/libs/product-catalog-microservice-0.0.1-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/product-catalog-microservice-0.0.1-SNAPSHOT.jar"]

EXPOSE 9001