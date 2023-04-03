const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new product
exports.create = function (req, res, next) {

      try {

        
        // Create a product
        const product = {
          title:req.body.title,
          price:req.body.price,
          brand:req.body.brand,
          category:req.body.category,
          thumbnail:req.body.thumbnail
        };
      
            // Save product in the database
          db.product.create(product)
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              console.log(err)
              res.status(500).send({
              message:
              err.message || "Some error occurred while creating product."
              });
          });


      } catch(err) {
          console.log(err)
      }
      
     
  
};

// Retrieve all product from the database.
exports.findAll = function (request, res, next) {
    db.product.findAll({attributes: ['product_id', 'title','price','brand','category','thumbnail']})
    .then(data => {
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving user."
                });
              });
};

exports.findproductByCustomerId = function (req, res, next) {
    const id = req.params.id;
  
    db.product.findAll({where: {user_id:id}})
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving product with id=" + id
        });
      });
  };


// Find a single product with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.job.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving product with id=" + id
        });
      });
  };

// Update a product by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "product was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating product with id=" + id
        });
      });
  };
  
// };

// // Delete a product with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.product.destroy({
      where: { product_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete product with id=${id}. Maybe product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete product with id=" + id
        });
      });
  };