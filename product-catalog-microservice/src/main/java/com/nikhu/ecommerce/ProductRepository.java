package com.nikhu.ecommerce;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by VRavuri on 04-11-2016.
 */

public interface ProductRepository {
    CompletableFuture<List<Product>> findAllProducts();
}