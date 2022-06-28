FROM node:18-alpine3.16 AS build-step

# Update latest security patches
RUN apk update && apk upgrade

# SET default APP_BUILD_DIR path
ARG APP_BUILD_DIR=/src/app
# SET default APP_BUILD_DIR path
ARG APP_SERVE_DIR=/store-ui

# Create APP_BUILD_DIR path
RUN mkdir -p $APP_BUILD_DIR
RUN mkdir -p $APP_SERVE_DIR

# Change working directory to application directory
WORKDIR $APP_BUILD_DIR

# Copy package.json to /app directory
COPY package.json .

# Install node modules/dependencies
RUN npm install

# Copy application code
COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# SET default APP_BUILD_DIR path
ARG APP_BUILD_DIR=/src/app
# SET default APP_BUILD_DIR path
ARG APP_SERVE_DIR=/store-ui
COPY --from=build-step $APP_BUILD_DIR/build $APP_SERVE_DIR