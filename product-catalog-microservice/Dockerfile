FROM anapsix/alpine-java:8_jdk_unlimited
MAINTAINER Venkata Ravuri <venkat@nikhu.com>

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

ADD ./build/libs/product-catalog-microservice-0.0.1-SNAPSHOT.jar /app/
CMD ["java", \
"-Dcom.sun.management.jmxremote", \
"-Dcom.sun.management.jmxremote.port=4444", \
"-Dcom.sun.management.jmxremote.local.only=false", \
"-Dcom.sun.management.jmxremote.authenticate=false", \
"-Dcom.sun.management.jmxremote.ssl=false", \
"-Xmx1024m", "-jar", "/app/product-catalog-microservice-0.0.1-SNAPSHOT.jar"]

EXPOSE 9001
EXPOSE 4444