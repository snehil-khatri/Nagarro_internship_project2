var Product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/shopping');

var products = [
    new Product({
        imagePath:"../images/img2.jpg",
        title:'TORETO Headphone',
        description:'Wireless Heaphone with Mic Bluetooth 5.0 40mm Driver Upto 9hrs of playtime ',
        price:57

    }),

    new Product({
        imagePath:"../images/img3.jpg",
        title:'Sony Headphones',
        description:'Sony WH-CH510 Headphones In-Ear Wireless with Mic(Voice Assistant, Active Black)',
        price:58

    }),
    new Product({
        imagePath:"../images/img4.jpg",
        title:'boAt Headphone',
        description:'boAt Rockerz 370 On Ear Bluetooth Headphones with Upto 12 Hours Playtime',
        price: 59
    })
    
];


var done=0;
for (var i=0; i<products.length;i++){
    // products[i].save();
    products[i].save(function(err, result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
