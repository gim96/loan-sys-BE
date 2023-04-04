module.exports = app => {
    // const auth = require("../middleware/auth");
      const loan = require("../controllers/loan.controller.js");
    
      var router = require("express").Router();
    
      // Create a new loan
      router.post("/", loan.create);
    
      // Retrieve all loan
      router.get("/", loan.findAll);

      router.get("/get-loan-by-userId/:id", loan.findLoanByCustomerId);
    
      // Retrieve a single loan with id
      router.get("/:id", loan.findOne);
    
      // // Update a loan with id
      // router.put("/:id" ,loan.update);

      // router.patch("/:id" ,loan.update);
    
      // Delete a loan with id
      // router.delete("/:id" ,loan.delete);
    
      app.use('/api/loans', router);
};