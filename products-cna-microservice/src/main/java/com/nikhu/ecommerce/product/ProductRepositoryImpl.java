package com.nikhu.ecommerce.product;

import com.mongodb.async.SingleResultCallback;
import com.mongodb.async.client.MongoCollection;
import com.mongodb.async.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static com.mongodb.client.model.Filters.eq;


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
        // TODO: Is this right place? We must close connection while bringing down application, not per call basis.
        database = getDatabase();
        productCollection = database.getCollection(collectionName).withDocumentClass(Product.class);
    }

    public CompletableFuture<List<Product>> findAllProducts() {
        CompletableFuture<List<Product>> future = new CompletableFuture<>();
        List<Product> list = new ArrayList<>();

        productCollection.find().forEach((product) -> {
            list.add(product);
        }, (final Void result, final Throwable t) -> {
            future.complete(list);
        });
        return future;
    }

    public CompletableFuture<Product> findProductById(String _id) {
        CompletableFuture<Product> future = new CompletableFuture<>();
        log.debug("Trying retrieve product with id: {}", _id);
        productCollection.find(eq("_id", new ObjectId(_id))).first(new SingleResultCallback<Product>() {
            @Override
            public void onResult(final Product product, final Throwable t) {
                log.debug("Retrieved product with id {}: {}", _id, product);
                future.complete(product);
            }
        });
        return future;
    }

    @Override
    public CompletableFuture<String> addProduct(Product product) {
        product.set_id(new ObjectId().toString());
        CompletableFuture<String> future = new CompletableFuture<>();
        productCollection.insertOne(product, new SingleResultCallback<Void>() {
            @Override
            public void onResult(final Void result, final Throwable t) {
                log.debug("Inserted new product.");
                future.complete(product.get_id());
            }
        });
        return future;
    }

    @Override
    public CompletableFuture<String> updateProduct(Product product) {
        CompletableFuture<String> future = new CompletableFuture<>();
        productCollection.updateOne(eq("_id", new ObjectId(product.get_id())), new Document("$set", new Document().append("name", product.getName()).append("description", product.getDescription()).append("price", product.getPrice()).append("currency", product.getCurrency()).append("image", product.getImage())),
                new SingleResultCallback<UpdateResult>() {
                    @Override
                    public void onResult(final UpdateResult result, final Throwable t) {
                        log.debug("Updating existing product {}", product.get_id());
                        future.complete(product.get_id());
                    }
                });
        return future;
    }
}
