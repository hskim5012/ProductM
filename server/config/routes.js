var product_controller = require('../controllers/product_controller');

module.exports = function(app) {
  app.get('/API/products', product_controller.all);
  app.get('/API/products/:id', product_controller.one);
  app.post('/API/products', product_controller.create_product);
  app.put('/API/products/:id/', product_controller.update_product);
  app.delete('/API/products/:id', product_controller.end_product);
}
