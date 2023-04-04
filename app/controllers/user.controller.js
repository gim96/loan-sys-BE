const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new User
exports.create = function (req, res, next) {

      try {

        // Create a user
        const hash = bcrypt.hashSync(req.body.password, 10);
        // Create a user
        const user = {
          username:req.body.username,
          password:hash,
          full_name:req.body.full_name,
          dob:req.body.dob,
          role:req.body.role
        };
  
        const result =  db.user.findAll({where : { username:user.username }});
      
        // Save user in the database
        if (result.length > 0) {
          res.status(401).json({success:false, message: 'This username already exist.!'})
      } else {
            // Save User in the database
          db.user.create(user)
          .then(data => {
              res.send(data);
          })
          .catch(err => {
              res.status(500).send({
              message:
              err.message || "Some error occurred while creating zone."
              });
          });
      }

      } catch(err) {
          console.log(err)
      }
      
     
  
};

// Retrieve all user from the database.
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

exports.findAllCustomers = async function (req, res, next) {

  db.sequelize.query(`select 
  users.user_id, users.username, users.full_name, users.dob, users.role, loans.loan_id, loans.loan_amount, used_amount  
  from users inner join loans ON users.user_id = loans.user_id AND users.role='customer' `,
  { type: db.sequelize.QueryTypes.SELECT}
  ).then(function(data) {
      res.send(data)
  })
  .catch((err) => {
    console.log(err)
  })

 
};


// Find a single user with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.user.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving job with id=" + id
        });
      });
  };

// Update a user by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "user was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };
  
// };

// // Delete a user with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.job.destroy({
      where: { job_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };