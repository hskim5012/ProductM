var Product = require('../models/products');

module.exports = {
  all: function(req, res){
      Product.find({}, function(err, products){
          if(err){
             console.log("Returned error", err);
              // respond with JSON
             res.json({err: err, data: ""})
          }
          else {
              // respond with JSON
             res.json({err: "", data: products})
          }
       })
  },
  one: function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({err: err, data: ""})
        }
        else {
            // respond with JSON
           res.json({err: "", data: product})
        }
     })
  },

  create_product: function(req, res) {
    console.log("Test");
    console.log(req.body);
    product = new Product({title: req.body.title, price: req.body.price, qty: req.body.qty});
    product.save(function(err) {
      if (err) {
        // console.log('returned error', err);
        res.json({err: err, data: ""})
      } else {
        res.json({err: "", data: product});
      }
    })
  },

  end_product: function(req, res) {
    console.log('get here');
    Product.deleteOne({_id: req.params.id}, function(err) {
      if (err) {
        console.log('returned error', err);
        res.json({err: err, data: ""})
      } else {
        res.json({err: "", data: ""});
      }
    });
  },
  update_product: function(req, res) {
    console.log(req.body)
    Product.findByIdAndUpdate({_id: req.params.id}, {$set:{title: req.body.title, price: req.body.price, qty: req.body.qty}}, {runValidators: true}, function(err, product) {
      if (err) {
        console.log('returned error', err);
        console.log("Something went wrong updating!!");
        res.json({err: err, data: ""})
      } else {
        res.json({err: "", data: product});
      }
    });
  }
}
