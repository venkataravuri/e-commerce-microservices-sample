package com.nikhu.ecommerce.product;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.javatic.mongo.jacksonCodec.objectId.Id;

public class Product {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    //@JsonDeserialize(using = ObjectIdDeSerializer.class)
    private String _id;
    private String name;
    private String description;
    private float price;
    private String currency;
    private String image;
    private String url;

    public Product() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}