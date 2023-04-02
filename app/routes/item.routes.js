module.exports = app => {
    // const auth = require("../middleware/auth");
      const item = require("../controllers/item.controller.js");
    
      var router = require("express").Router();
    
      // Create a new product
      router.post("/", item.create);
    
      // Retrieve all product
      router.get("/", item.findAll);

    //   router.get("/get-product-by-userId/:id", product.findproductByCustomerId);
    
      // Retrieve a single product with id
      router.get("/:id", item.findOne);
    
      // // Update a product with id
      router.put("/:id" ,item.update);
    
      // Delete a product with id
      router.delete("/:id" ,item.delete);
    
      app.use('/api/items', router);
};