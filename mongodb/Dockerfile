FROM mvertes/alpine-mongo

# Modify child mongo to use /data/db as dbpath (because /data/db wont persist the build)
RUN mkdir -p /data/db \
    && echo "dbpath = /data/db" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /data/db

COPY . /data/db

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db --smallfiles \
    && CREATE_FILES=/data/db/scripts/*-create.js \
    && for f in $CREATE_FILES; do mongo 127.0.0.1:27017 $f; done \
    && INSERT_FILES=/data/db/scripts/*-insert.js \
    && for f in $INSERT_FILES; do mongo 127.0.0.1:27017 $f; done \
    && mongod --dbpath /data/db --shutdown \
    && chown -R mongodb /data/db

# Make the new dir a VOLUME to persists it
VOLUME /data/db

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles"]