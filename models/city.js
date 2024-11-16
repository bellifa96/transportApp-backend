module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return City;
  };
  