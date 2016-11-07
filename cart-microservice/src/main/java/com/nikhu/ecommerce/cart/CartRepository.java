package com.nikhu.ecommerce.cart;

/**
 * Created by VRavuri on 07-11-2016.
 */
public interface CartRepository {
    Cart getCartById(String id);

    Cart addToCart(String id, CartItem cartItem);
}
