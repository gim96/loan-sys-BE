const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new cart
exports.create = function (req, res, next) {

      try {

        
        // Create a cart
        const cart = {
          user_id:req.body.user_id,
          product_id:req.body.product_id,
        };
      
            // Save cart in the database
          db.cart.create(cart)
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              console.log(err)
              res.status(500).send({
              message:
              err.message || "Some error occurred while creating cart."
              });
          });


      } catch(err) {
          console.log(err)
      }
      
     
  
};

// Retrieve all cart from the database.
exports.findAll = function (request, res, next) {
    db.cart.findAll({attributes: ['cart_id', 'title','price','brand','category','thumbnail']})
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

exports.findCartByCustomerId = function (req, res, next) {
    const id = req.params.id;
    
    db.sequelize.query(`select 
	products.* 
    from carts 
    inner join products ON carts.product_id = product.product_id 
    AND carts.user_id=:userId`,
    { replacements: {userId:id}, type: db.sequelize.QueryTypes.SELECT}
    ).then(function(data) {
        res.send(data);
    })
    .catch((err) => {
        console.log(err)
    })

  };


// Find a single cart with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.job.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving cart with id=" + id
        });
      });
  };

// Update a cart by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "cart was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating cart with id=" + id
        });
      });
  };
  
// };

// // Delete a cart with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.job.destroy({
      where: { job_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cart was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete cart with id=${id}. Maybe cart was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cart with id=" + id
        });
      });
  };