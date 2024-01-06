FROM openjdk:17-alpine
ARG APP_HOME=/app
WORKDIR ${APP_HOME}
RUN apk add --no-cache findutils
COPY gradlew .
COPY gradle gradle
COPY settings.gradle .
COPY build.gradle .
RUN chmod +x ./gradlew
RUN ls -l 
RUN ./gradlew build -i
RUN cp build/libs/*.jar app.jar
RUN find . -name "*.jar"
# COPY ./build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","./app.jar", "--server.port=${CART_SERVER_PORT}"]