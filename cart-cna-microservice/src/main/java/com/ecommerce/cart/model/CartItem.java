package com.ecommerce.cart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem  {
    private String productId;
    private String sku;
    private String title;
    private int quantity;
    private float price;
    private String currency;
}
