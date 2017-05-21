FROM smebberson/alpine-redis
MAINTAINER Venkata Ravuri <venkat@nikhu.com>

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

EXPOSE 6379

#docker build . -t ecommerce/redis
#docker run --rm --name redis  ecommerce/redis
#docker exec -it redis redis-cli
