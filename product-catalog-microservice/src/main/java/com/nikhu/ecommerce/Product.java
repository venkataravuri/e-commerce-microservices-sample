package com.nikhu.ecommerce;

public class Product {

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
}