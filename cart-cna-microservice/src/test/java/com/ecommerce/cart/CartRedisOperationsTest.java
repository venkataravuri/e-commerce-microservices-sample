package com.ecommerce.cart;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = CartApplication.class)
public class CartRedisOperationsTest {

    @Autowired
    private ReactiveRedisTemplate<String, Cart> redisTemplate;

    private ReactiveValueOperations<String, Cart> cartOps;

    @BeforeEach
    public void setup() {
        cartOps = redisTemplate.opsForValue();
    }

    @Test
    public void givenCart_whenSet_thenSet() {

        Mono<Boolean> result = cartOps.set("cart-1", getSampleCart());

        StepVerifier.create(result)
                .expectNext(true)
                .verifyComplete();
    }

    @Test
    public void givenCartId_whenGet_thenReturnsCart() {

        Mono<Cart> fetchedCart = cartOps.get("cart-1");

        StepVerifier.create(fetchedCart)
                .expectNext(getSampleCart())
                .verifyComplete();
    }

    @Test
    public void givenCart_whenSetWithExpiry_thenSetsWithExpiryTime() throws InterruptedException {

        Mono<Boolean> result = cartOps.set("cart-2", getSampleCart(), Duration.ofSeconds(1));

        Mono<Cart> fetchedCart = cartOps.get("129");

        StepVerifier.create(result)
                .expectNext(true)
                .verifyComplete();

        Thread.sleep(2000L);

        StepVerifier.create(fetchedCart)
                .expectNextCount(0L)
                .verifyComplete();
    }

    private Cart getSampleCart() {
        CartItem cartItem = new CartItem("cart-1-1", "sku1", "Nike Shoes", 1, 145.0f, "USD");
        ArrayList<CartItem> cartItems = new ArrayList<CartItem>();
        cartItems.add(cartItem);
        return new Cart("cart-1", cartItems, 145.0f, "USD");
    }

}