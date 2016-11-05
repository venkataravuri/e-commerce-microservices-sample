package com.nikhu.ecommerce.product;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.javatic.mongo.jacksonCodec.objectId.Id;

public class Product {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize
    private String _id;
    private String name;
    private String lname;
    private String category;
    private long lastUpdated;

    public Product(String _id, String name, String lname, String category, long lastUpdated) {
        this._id = _id;
        this.name = name;
        this.lname = lname;
        this.category = category;
        this.lastUpdated = lastUpdated;
    }

    public Product() {
    }

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public String getLname() {
        return lname;
    }

    public String getCategory() {
        return category;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLastUpdated(long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}