module.exports = (sequelize, DataTypes) => {
    const Shipment = sequelize.define('Shipment', {
      departureCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      arrivalCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in transit', 'delivered', 'cancelled'),
        defaultValue: 'pending',
      },
    });
  
    Shipment.associate = (models) => {
      Shipment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Shipment.belongsTo(models.City, {
        foreignKey: 'departureCityId',
        as: 'departureCity',
      });
      Shipment.belongsTo(models.City, {
        foreignKey: 'arrivalCityId',
        as: 'arrivalCity',
      });
    };
  
    return Shipment;
  };
  