module.exports = app => {
    // const auth = require("../middleware/auth");
      const item = require("../controllers/item.controller.js");
    
      var router = require("express").Router();
    
      // Create a new product
      router.post("/", item.create);
    
      // Retrieve all product
      router.get("/", item.findAll);
    
      // Retrieve a single product with id
      router.get("/:id", item.findOne);
    

    
      app.use('/api/items', router);
};