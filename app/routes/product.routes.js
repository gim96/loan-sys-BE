module.exports = app => {
    // const auth = require("../middleware/auth");
      const product = require("../controllers/product.controller.js");
    
      var router = require("express").Router();
    
      // Create a new product
      router.post("/", product.create);
    
      // Retrieve all product
      router.get("/", product.findAll);

    //   router.get("/get-product-by-userId/:id", product.findproductByCustomerId);
    
      // Retrieve a single product with id
      router.get("/:id", product.findOne);
    
      // // Update a product with id
      router.put("/:id" ,product.update);
    
      // Delete a product with id
      router.delete("/:id" ,product.delete);
    
      app.use('/api/products', router);
};