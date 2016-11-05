package com.nikhu.ecommerce.product;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
public class ProductCatalogController extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ProductCatalogController.class);
    List<Product> products;

    @Value("${products.displayCount: 10}")
    private int displayCount;

    @Autowired
    private ProductRepository productRepository;


    private ObjectMapper jsonMapper = new ObjectMapper();
    @Autowired
    private ResourceLoader resourceLoader;

    @PostConstruct
    public void init() throws IOException {
        //Set pretty printing of json
        jsonMapper.enable(SerializationFeature.INDENT_OUTPUT);

        Resource resource = resourceLoader.getResource("classpath:data/products.json");
        File productsJsonFile = resource.getFile();
        log.debug("Loading data/products.json from classpath. File path: ", productsJsonFile.getAbsolutePath());

        products = jsonMapper.readValue(productsJsonFile, new TypeReference<List<Product>>() {
        });
    }

    @RequestMapping("/")
    public String index() {
        return "<h1>Welcome to Product Catalog API!</h1>";
    }

    @RequestMapping(value = "/products/recommendations", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> productRecommendations() {
        CompletableFuture<List<Product>> future = productRepository.findAllProducts();
        List<Product> products = null; //Just for testing if everything is as planned
        try {
            products = future.get();
        } catch (InterruptedException e) {
            log.error("Error while getting data:", e);
        } catch (ExecutionException e) {
            log.error("Error while getting data:", e);
        }
        log.info("findAllProducts::Count::" + products.size());
        return products.stream().collect(Collectors.toList());
    }

    @RequestMapping("/products/{_id}")
    public Product product(@PathVariable("_id") String _id) throws Exception {
        CompletableFuture<Product> productById = productRepository.findProductById(_id);
        Product product = null;
        try {
            product = productById.get();
        } catch (InterruptedException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        } catch (ExecutionException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        }
        return product;
    }

    @RequestMapping(value = "/products", method = RequestMethod.PUT)
    public String addProduct(@RequestBody Product product) throws Exception {
        CompletableFuture<String> future = productRepository.addProduct(product);
        String productId = null;
        try {
            productId = future.get();
        } catch (InterruptedException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        } catch (ExecutionException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        }
        return productId;
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public String updateProduct(@RequestBody Product product) throws Exception {
        CompletableFuture<String> future = productRepository.updateProduct(product);
        String productId = null;
        try {
            productId = future.get();
        } catch (InterruptedException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        } catch (ExecutionException e) {
            log.error("Error while getting data:", e);
            throw new Exception(e);
        }
        return productId;
    }

    @ExceptionHandler(Exception.class)
    void handleExceptions(HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error. We will be addressing this issue soon.");
    }
}