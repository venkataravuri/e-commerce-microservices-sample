package com.nikhu.ecommerce.product;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class ProductCatalogController extends ResponseEntityExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(ProductCatalogController.class);

    @Autowired
    private ProductRepository productRepository;


    @RequestMapping("/")
    public String index() {
        return "<h1>Welcome to Product Catalog API!</h1>";
    }

    @RequestMapping(value = "/products/recommendations", method = RequestMethod.GET)
    public
    @ResponseBody
    CompletableFuture<List<Product>> productRecommendations() {
        return productRepository.findAllProducts();
    }

    @RequestMapping("/products/{_id}")
    public CompletableFuture<Product> product(@PathVariable("_id") String _id) throws Exception {
        return productRepository.findProductById(_id);
    }

    @RequestMapping(value = "/products", method = RequestMethod.PUT)
    public CompletableFuture<String> addProduct(@RequestBody Product product) throws Exception {
        return productRepository.addProduct(product);
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public CompletableFuture<String> updateProduct(@RequestBody Product product) throws Exception {
        return productRepository.updateProduct(product);
    }

    @ExceptionHandler(Exception.class)
    void handleExceptions(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error. We will be addressing this issue soon.");
    }
}