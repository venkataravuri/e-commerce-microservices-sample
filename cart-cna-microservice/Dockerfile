
FROM openjdk:17-jdk-oracle
RUN groupadd spring && useradd -g spring spring
USER spring:spring
ARG JAR_FILE=build/libs/cart-1.0.0.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]