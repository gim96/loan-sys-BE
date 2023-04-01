module.exports = (sequelize, Sequelize) => {
    const loan = sequelize.define("loans", {
      loan_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      loan_amount: {
        type: Sequelize.STRING
      },
      used_amount: {
        type: Sequelize.STRING
      },
      loan_installment_type:{
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    });
  
    return loan;
  };