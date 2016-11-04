package com.nikhu.ecommerce;

import com.mongodb.async.client.MongoCollection;
import com.mongodb.async.client.MongoDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by VRavuri on 04-11-2016.
 */
@Repository
public class ProductRepositoryImpl extends AbstractRepository implements ProductRepository {

    private static final Logger log = LoggerFactory.getLogger(AbstractRepository.class);


    private MongoDatabase database;
    private MongoCollection<Product> productCollection;

    @PostConstruct
    public void initIt() {
        database = getDatabase();
        productCollection = database.getCollection(collectionName).withDocumentClass(Product.class);
    }

    public CompletableFuture<List<Product>> findAllProducts() {
        CompletableFuture<List<Product>> future = new CompletableFuture<>();
        List<Product> list = new ArrayList<>();

        productCollection.find().forEach((product) -> {
            try {
                list.add(product);
            } catch (Exception e) {
                log.error("Error while parsing document::" + product.toString(), e);
            }

        }, (final Void result, final Throwable t) -> {
            future.complete(list);
        });
        return future;
    }

}
