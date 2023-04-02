module.exports = (sequelize, Sequelize) => {
    const item = sequelize.define("items", {
      item_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      product_id:{
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  
    return item;
  };