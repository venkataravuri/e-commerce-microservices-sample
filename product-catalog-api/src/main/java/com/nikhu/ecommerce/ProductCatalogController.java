package com.nikhu.ecommerce;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Controller
@RequestMapping("/products")
public class ProductCatalogController {

    Product product = new Product("1", "xyz", "xyz", "zys", 01010l);

    @PostConstruct
    public void init() throws IOException {
//        ResourceLoader resourceLoader = new Re
//        Resource resource = ResourceLoader.getResource("classpath:data/products.json");
//        File productsJsonFile = resource.getFile();
//
//        ObjectMapper jsonMapper = new ObjectMapper();
//
//        product = jsonMapper.readValue(productsJsonFile, Product.class);
    }


    @RequestMapping(value = "/recommendations", method = RequestMethod.GET)
    public
    @ResponseBody
    Product productRecommendations() {
        return product;
    }

}