package com.ecommerce.cart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem  {
    private String id;
    private String name;
    private float price;
    private String currency;
}
