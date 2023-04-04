const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new cart
exports.create = async function (req, res, next) {

      try {

        
        // Create a cart
        const cart = {
          user_id:req.body.user_id,
          product_id:req.body.product_id,
        };
        
        const productLn = await db.cart.findAll({ where: {user_id:cart.user_id, product_id:cart.product_id}, raw:true});
    
          if (productLn.length > 0) {
             res.send({message:'this product already added.!'})
          } else {

            db.sequelize.query(`select (loan_amount - used_amount) as loan_balance from loans where user_id=:userId`,
            { replacements: {userId:cart.user_id}, type: db.sequelize.QueryTypes.SELECT}
            ).then(async function(data) {

                const balance = data[0].loan_balance
                
                db.sequelize.query(`select SUM(products.price) as amount
                from products inner join carts ON products.product_id = carts.product_id AND carts.user_id=:userId`,
                { replacements: {userId:cart.user_id}, type: db.sequelize.QueryTypes.SELECT}
                ).then(async function(datax) {
                    const amount = datax[0].amount
                      // Save cart in the database
                      console.log('loan bal', balance)
                      console.log('amount', amount)
                      const currAmount = await db.product.findAll({ where: {product_id:cart.product_id}, raw:true});
                      const newAmount = currAmount[0].price * 1 + amount * 1 
                      console.log('new amount', newAmount)
                    if (newAmount * 1 <= balance * 1){

                      await db.cart.create(cart)
                      .then(data => {
                          res.send(data);
                      })
                      .catch(err => {
                        // console.log(err)
                        res.status(500).send({
                          message:
                          err.message || "Some error occurred while creating cart."
                         });
                      });
                    } else {
               
                      res.status(500).send({message:'Remaining loan amount exeeded.!'});

                    }
                })
                .catch((er) => {
                  console.log(er)
                })
                
                

                 
            })
            .catch((err) => {
              console.log(err)
            })
            
            
             
          }
          
        


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
	    products.*, carts.cart_id 
      from carts 
      inner join products ON carts.product_id = products.product_id 
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


  
// // Delete a cart with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    db.cart.destroy({
      where: { cart_id: id }
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
        console.log(err)
        res.status(500).send({
          message: "Could not delete cart with id=" + id
        });
      });
  };