package com.nikhu.ecommerce.product;

import com.mongodb.ServerAddress;
import com.mongodb.async.client.MongoClient;
import com.mongodb.async.client.MongoClientSettings;
import com.mongodb.async.client.MongoClients;
import com.mongodb.async.client.MongoDatabase;
import com.mongodb.connection.ClusterSettings;
import fr.javatic.mongo.jacksonCodec.JacksonCodecProvider;
import fr.javatic.mongo.jacksonCodec.ObjectMapperFactory;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import static java.util.Arrays.asList;

/**
 * Created by VRavuri on 04-11-2016.
 */
public abstract class AbstractRepository {

    private static final Logger log = LoggerFactory.getLogger(AbstractRepository.class);
    @Value("${db.database.collectionName: products}")
    protected String collectionName;
    @Value("${db.server.hostname: 192.168.99.100}")
    private String dbServerHostname;
    @Value("${db.server.port: 27017}")
    private int dbServerPort;
    @Value("${db.database.name: products}")
    private String dbDatabaseName;

    public MongoDatabase getDatabase() {
        log.debug("Connecting to database host: {} port: {} db: {}", dbServerHostname, dbServerPort, dbDatabaseName);
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                MongoClients.getDefaultCodecRegistry(), CodecRegistries.fromProviders(
                        new JacksonCodecProvider(ObjectMapperFactory.createObjectMapper())));
        ClusterSettings clusterSettings = ClusterSettings.builder().hosts(asList(new ServerAddress(dbServerHostname, dbServerPort))).build();
        MongoClientSettings settings = MongoClientSettings.builder().codecRegistry(codecRegistry).clusterSettings(clusterSettings).build();
        MongoClient mongoClient = MongoClients.create(settings);
        // TODO: Close client connection later;

        MongoDatabase database = mongoClient.getDatabase(dbDatabaseName);
        return database;
    }
}