# Build Stage
FROM node:18-alpine3.16 AS build-step

# Update latest security patches
RUN apk update && apk upgrade

# SET default APP_BUILD_DIR path
ARG APP_BUILD_DIR=/src/app
# SET default APP_SERVE_DIR path
ARG APP_SERVE_DIR=/store-ui

# Create APP_BUILD_DIR path
RUN mkdir -p $APP_BUILD_DIR
RUN mkdir -p $APP_SERVE_DIR

# Change working directory to the application directory
WORKDIR $APP_BUILD_DIR

# Copy package.json and package-lock.json to /src/app directory
COPY package*.json ./

# Install node modules/dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM nginx:1.21.6-alpine

# SET default APP_BUILD_DIR path
ARG APP_SERVE_DIR=/store-ui

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create APP_SERVE_DIR path
RUN mkdir -p $APP_SERVE_DIR

# Copy built application from the build stage
COPY --from=build-step /src/app/build $APP_SERVE_DIR

# Set nginx to serve the built application
WORKDIR $APP_SERVE_DIR