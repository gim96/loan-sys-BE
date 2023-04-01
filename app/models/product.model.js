module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define("products", {
      product_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      brand:{
        type: Sequelize.STRING
      },
      category:{
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    });
  
    return product;
  };