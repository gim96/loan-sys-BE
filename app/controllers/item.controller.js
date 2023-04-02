const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new item
exports.create = function (req, res, next) {

      try {

        
        // Create a item
        const item = {
            product_id:req.body.product_id,
            order_id:req.body.order_id,
        };
  
     
            // Save item in the database
          db.item.create(item)
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              console.log(err)
              res.status(500).send({
              message:
              err.message || "Some error occurred while creating item."
              });
          });

      } catch(err) {
          console.log(err)
      }
      
     
  
};

// Retrieve all item from the database.
exports.findAll = function (request, res, next) {
    db.job.findAll({attributes: ['user_id','username','password','full_name','dob', 'role']})
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

exports.finditemByCustomerId = function (req, res, next) {
    const id = req.params.id;
  
    db.item.findAll({where: {user_id:id}})
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving item with id=" + id
        });
      });
  };


// Find a single item with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.job.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving item with id=" + id
        });
      });
  };

// Update a item by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "item was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating item with id=" + id
        });
      });
  };
  
// };

// // Delete a item with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.job.destroy({
      where: { job_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete item with id=${id}. Maybe item was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete item with id=" + id
        });
      });
  };