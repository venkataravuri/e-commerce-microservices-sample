package com.nikhu.ecommerce.cart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by VRavuri on 07-11-2016.
 */
@Repository
public class CartRepositoryImpl implements CartRepository {

    private static final Logger log = LoggerFactory.getLogger(CartRepositoryImpl.class);

    @Override
    @Cacheable("cart")
    public Cart getCartById(String id) {
        log.info("Should be cached, on first attempt.");
        List<CartItem> cartItems = new ArrayList<CartItem>();
        cartItems.add(new CartItem("123", "Sample", 20000.00f, "INR"));
        Cart cart = new Cart(id, cartItems, 20000.00f, "INR");
        return cart;
    }
}
