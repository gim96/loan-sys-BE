const db = require("../models");
const bcrypt = require('bcrypt');
// Create and Save a new order
exports.create = function (req, res, next) {

      try {

        // Create a order
        const order = {
            status:req.body.order_amount,
            user_id:req.body.used_amount,
            product_id:req.body.order_installment_type,
        };

        // Save order in the database
        db.order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({message:err.message || "Some error occurred while creating order."});
        });

      } catch(err) {
          console.log(err)
      }
      
     
  
};

exports.createWithItems = function (req, res, next) {

    try {

        const productIds = JSON.parse(req.params.ids)
      // Create a order
      const order = {
          status:req.body.status,
          user_id:req.body.user_id,
      };
      console.log(productIds)
    //   Save order in the database
      db.order.create(order)
      .then(async(data) => {
        //   res.send(data);
          let orderId = data.order_id
          productIds.map(async(item) => {
           
           await db.item.create({product_id:item, order_id:orderId})
            .then(data => {

            })
            .catch(err => {
                console.log(err)
                res.status(500).send({message:err.message || "Some error occurred while creating order."});
            });
          })
          
          let arr = []
          let productPrice = 0
          productIds.map(async(item) => {
            var prices = await db.product.findOne({ where: {product_id:item}, raw:true});
            productPrice = productPrice + prices.price
          })
         
          const loanData = await db.loan.findOne({ where: {user_id:order.user_id}, raw:true});
        //   console.log(loanData)
          const newAmount = loanData.used_amount + productPrice
        //   console.log(newAmount)
          db.loan.update({used_amount:newAmount}, {
            where: { loan_id: loanData.loan_id }
          })
            .then(
                res.send({
                  message: "order was updated successfully."
                })
            )
            .catch(err => {
              res.status(500).send({
                message: "Error updating order with id=" + id
              });
            });

          res.send(data);
      })

      .catch(err => {
          console.log(err)
          res.status(500).send({message:err.message || "Some error occurred while creating order."});
      });

    } catch(err) {
        console.log(err)
    }
};



// Retrieve all order from the database.
exports.findAll = function (request, res, next) {
    db.order.findAll({attributes: ['order_id','user_id','status',]})
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

exports.findOrderDataByUserId =async function (req, res, next) {
    const id = req.params.id
    let allData = {}
   await db.order.findAll({where: {user_id:id}})
    .then(async data_order => {
        allData.orderData = data_order
      await db.item.findAll({where: {order_id:data_order[0].order_id}})
        .then(async data_item => {
            allData.itemData = data_item

            let arr_products = [] 
            data_item && data_item.map(async (item_product) => {

               await db.product.findOne({where: {product_id:item_product.product_id}})
                .then( data_product => {
                   
                    arr_products.push(data_product)
                   
                })
                .catch(err => {
                    res.status(500).send({ message:err.message || "Some error occurred while retrieving user."});
                });
            })
            console.log(arr_products)
            allData.productData = arr_products

        })
        .catch(err => {
            res.status(500).send({ message:err.message || "Some error occurred while retrieving user."});
        });
    })
    .catch(err => {
        res.status(500).send({ message:err.message || "Some error occurred while retrieving user."});
    });
    res.send({ allData });

};

exports.findorderByCustomerId = function (req, res, next) {
    const id = req.params.id;
  
    db.order.findAll({where: {user_id:id}})
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving order with id=" + id
        });
      });
  };


// Find a single order with an id
exports.findOne = function (req, res, next) {
    const id = req.params.id;
  
    db.job.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving order with id=" + id
        });
      });
  };

// Update a order by the id in the request
exports.update = function (req, res, next) {
    const id = req.params.id;
  
    db.job.update(req.body, {
      where: { job_id: id }
    })
      .then(
          res.send({
            message: "order was updated successfully."
          })
      )
      .catch(err => {
        res.status(500).send({
          message: "Error updating order with id=" + id
        });
      });
  };
  
// };

// // Delete a order with the specified id in the request
exports.delete = function (req, res, next) {
    const id = req.params.id;
  
    db.job.destroy({
      where: { job_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "order was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete order with id=${id}. Maybe order was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete order with id=" + id
        });
      });
  };