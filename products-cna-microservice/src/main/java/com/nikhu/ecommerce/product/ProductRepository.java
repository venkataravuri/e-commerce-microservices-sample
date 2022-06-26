package com.nikhu.ecommerce.product;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by VRavuri on 04-11-2016.
 */

public interface ProductRepository {
    CompletableFuture<List<Product>> findAllProducts();

    CompletableFuture<Product> findProductById(String _id);

    CompletableFuture<String> addProduct(Product product);

    CompletableFuture<String> updateProduct(Product product);
}