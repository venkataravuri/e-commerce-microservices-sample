function get_results(result) {
    print(tojson(result));
}

function insert_product(object) {
    print(db.products.insert(object));
}

insert_product({
    "_id": ObjectId("57a98d98e4b00679b4a830af"),
    "name": "Women's Kate Ivory Peep-Toe Stiletto Heel",
    "lname": "women's kate ivory peep-toe stiletto heel",
    "category": "/84700/80009/1282094266/1200003270",
    "lastUpdated": 1400877254787
});
insert_product({
    "_id": ObjectId("57a98d98e4b00679b4a830b2"),
    "name": "Women's Kate Ivory Peep-Toe Stiletto Heel",
    "lname": "women's kate ivory peep-toe stiletto heel",
    "category": "/84700/80009/1282094266/1200003270",
    "lastUpdated": 1400877254787
});
insert_product({
    "_id": ObjectId("57a98d98e4b00679b4a830b5"),
    "name": "Women's Kate Ivory Peep-Toe Stiletto Heel",
    "lname": "women's kate ivory peep-toe stiletto heel",
    "category": "/84700/80009/1282094266/1200003270",
    "lastUpdated": 1400877254787
});
//pass passsord
print("_______PRODUCTS DATA_______");
db.products.find().forEach(get_results);
print("______END PRODUCTS DATA_____");