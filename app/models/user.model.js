module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
      user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      }
      
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    });
  
    return user;
  };