package com.ecommerce.cart.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin
@RestController
public class CartController {

    private static final Logger LOG = LoggerFactory.getLogger(CartController.class);

    private ReactiveRedisTemplate<String, Cart> redisTemplate;

    private ReactiveValueOperations<String, Cart> cartOps;

    CartController(ReactiveRedisTemplate<String, Cart> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.cartOps = this.redisTemplate.opsForValue();
    }

    @RequestMapping("/")
    public String index() {
        return "{ \"name\": \"Cart API\", \"version\": 1.0.0} ";
    }

    @GetMapping("/cart")
    public Flux<Cart> list() {
        return redisTemplate.keys("*")
                .flatMap(cartOps::get);
    }

    @GetMapping("/cart/{customerId}")
    public Mono<Cart> findById(@PathVariable String customerId) {
        return cartOps.get(customerId);
    }

    @PostMapping("/cart")
    Mono<Void> create(@RequestBody Mono<Cart> cart) {
        return cart.doOnNext(c -> {
            LOG.info("Adding cart to Redis: {}", c);
            float total = 0;
            if (c.getCustomerId() == null) {
                LOG.error("Customer Id is missing.");
                return;
            }
            for (CartItem item : c.getItems()) {
                total += item.getPrice() * item.getQuantity();
            }
            c.setTotal(total);
            cartOps.set(c.getCustomerId(), c).subscribe();
        }).then();
    }
}