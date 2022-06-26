function get_results(result) {
    print(tojson(result));
}

function insert_product(object) {
    print(db.products.insert(object));
}

insert_product({
    "_id": ObjectId("57a98d98e4b00679b4a830af"),
    "name": "DJI Phantom 3 Quadcopter Drone",
    "description": "DJI Phantom 3 Standard Quadcopter Drone with 2.7K HD Video Camera",
    "price": 29999.00,
    "currency": "INR",
    "image": "img/01.jpg",
    "url": "https://www.amazon.com/DJI-Phantom-Standard-Quadcopter-Camera/dp/B013U0F6EQ/"
});
insert_product({
    "_id": ObjectId("581d772dfed7620ee89936de"),
    "name": "Autel Robotics X-Star Drone",
    "description": "Autel Robotics X-Star Drone with 4K Camera & Wi-Fi HD Live View (Orange)",
    "price": 24999.00,
    "currency": "INR",
    "image": "img/02.jpg",
    "url": "https://www.amazon.com/Autel-Robotics-X-Star-Camera-Orange/dp/B01B1H80K2/"
});
insert_product({
    "_id": ObjectId("57a98d98e4b00679b4a830b5"),
    "name": "UPair One Drone",
    "description": "UPair One Drone with 2K Camera,5.8G FPV Monitor Transmit Live Video,2.4G Remote Controller, GPS Auto Return Function, a key to Return, Beginners Drone",
    "price": 19000.00,
    "currency": "INR",
    "image": "img/03.jpg",
    "url": "https://www.amazon.com/UPair-Transmit-Controller-Function-Beginners/dp/B01FSL5Q6S"
});
//pass passsord
print("_______PRODUCTS DATA_______");
db.products.find().forEach(get_results);
print("______END PRODUCTS DATA_____");