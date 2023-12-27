package com.ecommerce.cart.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

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
        return cartOps.get(customerId)
        .defaultIfEmpty(new Cart(customerId));
    }

    @PostMapping("/cart")
    Mono<Void> create(@RequestBody Mono<Cart> cartMono) {
        return cartMono.doOnNext(cart -> {
            LOG.info("✅✅✅✅ Adding cart to Redis: {}", cart);
            float total = 0;
            if (cart.getCustomerId() == null) {
                LOG.error("🔥🔥🔥🔥 Customer Id is missing.");
                return;
            }
            for (CartItem item : cart.getItems()) {
                total += item.getPrice() * item.getQuantity();
            }
            cart.setTotal(total);
            cartOps.set(cart.getCustomerId(), cart).subscribe();
        }).then();
    }

    @DeleteMapping("/cart/{customerId}/{productId}")
    Mono<Void> delete(@PathVariable String customerId, @PathVariable String productId) {
        return cartOps.get(customerId).flatMap(c -> {
            c.getItems().removeIf(item -> item.getProductId().equals(productId));
            return cartOps.set(c.getCustomerId(), c);
        }).then();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/cart/{customerId}")
    public Mono<ResponseEntity<Void>> addToCart(@PathVariable String customerId, @RequestBody Mono<CartItem> newItemMono) {
        return newItemMono.doOnNext(newItem -> LOG.info("🔥🔥🔥🔥 Adding item to cart: {}", newItem))
            .flatMap(newItem -> cartOps.get(customerId)
                .defaultIfEmpty(new Cart(customerId))
                .flatMap(cart -> {
                    for (CartItem item : cart.getItems()) {
                        if (item.getProductId().equals(newItem.getProductId())) {
                            item.setQuantity(item.getQuantity() + newItem.getQuantity());
                            cart.setTotal(cart.getTotal() + newItem.getPrice() * newItem.getQuantity());
                            return Mono.just(cart);
                        }
                    }
                    cart.getItems().add(newItem);
                    cart.setTotal(cart.getTotal() + newItem.getPrice() * newItem.getQuantity());
                    return Mono.just(cart);
                }))
                .flatMap(cart -> {
                    LOG.info("✅✅✅✅ Adding item to cart: {}", cart);
                    return cartOps.set(customerId, cart);
                })
                .thenReturn(new ResponseEntity<Void>(HttpStatus.CREATED))
                .onErrorReturn(new ResponseEntity<Void>(HttpStatus.BAD_REQUEST));
    }
}