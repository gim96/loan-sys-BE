const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new User
exports.create = function (req, res, next) {

      try {

        
        // Create a loan
        const loan = {
          loan_amount:req.body.loan_amount,
          used_amount:req.body.used_amount,
          loan_installment_type:req.body.loan_installment_type,
          user_id:req.body.user_id
        };
  
     
            // Save loan in the database
          db.loan.create(loan)
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              console.log(err)
              res.status(500).send({
              message:
              err.message || "Some error occurred while creating loan."
              });
          });

      } catch(err) {
          console.log(err)
      }
      
     
  
};

// Retrieve all loan from the database.
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

exports.findLoanByCustomerId = function (req, res, next) {
    const id = req.params.id;
  
    db.loan.findAll({where: {user_id:id}})
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving loan with id=" + id
        });
      });
  };


// Find a single loan with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.job.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving loan with id=" + id
        });
      });
  };

// Update a loan by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "loan was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating loan with id=" + id
        });
      });
  };
  
// };

// // Delete a loan with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.job.destroy({
      where: { job_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "loan was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete loan with id=${id}. Maybe loan was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete loan with id=" + id
        });
      });
  };