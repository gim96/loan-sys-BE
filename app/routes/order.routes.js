module.exports = app => {
    // const auth = require("../middleware/auth");
      const order = require("../controllers/order.controller.js");
    
      var router = require("express").Router();
    
      // Create a new product
      router.post("/", order.create);
    //   cearet with  items
      router.post("/create-with-items/:ids", order.createWithItems);

    
    
      // Retrieve all product
      router.get("/", order.findAll);
      router.get("/get-orders-data/:id", order.findOrderDataByUserId);

      router.get("/get-orders-data-with-user-data", order.findOrdersWithCustomerData);

      router.get("/get-orders-data-with-items", order.findOrdersWithItems);

    //   router.get("/get-product-by-userId/:id", product.findproductByCustomerId);
    
      // Retrieve a single product with id
      router.get("/:id", order.findOne);
    
      // // Update a product with id
      router.put("/:id" ,order.update);
    
      // Delete a product with id
      // router.delete("/:id" ,order.delete);
    
      app.use('/api/orders', router);
};