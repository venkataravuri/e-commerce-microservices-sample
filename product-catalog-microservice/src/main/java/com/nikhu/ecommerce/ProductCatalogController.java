package com.nikhu.ecommerce;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Configuration
@RestController
@RefreshScope
public class ProductCatalogController {

    private static final Logger log = LoggerFactory.getLogger(ProductCatalogController.class);

    @Value("${displayCount: pqr}")
    private String displayCount;

    List<Product> products;
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
        log.debug("display count: ", displayCount);
        return "Welcome to Product Catalog API!";
    }

    @RequestMapping(value = "/products/recommendations", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> productRecommendations() {
        log.debug("Recommended products: ", products);
        return products;
    }

    @RequestMapping("/products/{_id}")
    public Product product(@PathVariable("_id") String _id) {
        return products.stream()
                .filter(p -> p.get_id().equalsIgnoreCase(_id))
                .findFirst()
                .get();
    }
}