module.exports = app => {
    // const auth = require("../middleware/auth");
      const auth = require("../controllers/auth.controller.js");
    
      var router = require("express").Router();
    
      //user login
      router.post("/", auth.authentication);
    

    
      app.use('/api/auth', router);
    };