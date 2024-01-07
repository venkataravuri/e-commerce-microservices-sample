FROM eclipse-temurin:17-jdk
ARG APP_HOME=/app
WORKDIR ${APP_HOME}
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