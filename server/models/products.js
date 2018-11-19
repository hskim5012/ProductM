var mongoose = require('mongoose');
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/ProductManager_db");

autoIncrement.initialize(connection);


var ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    minlength: [4, 'title must be at least 4 characters long']
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
    min: [0, "Cannot be less than 0"],
  },
  qty: {
    type: Number,
    required: [true, "Enter quantity"],
    min:[0, "Cannot be less than 0"],
  }
}, {timestamps: true });

ProductSchema.plugin(autoIncrement.plugin, 'Product');
var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
