module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      shipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Shipments',
          key: 'id',
        },
      },
      transporterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'declined', 'pending'),
        defaultValue: 'pending',
      },
    });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.User, {
        foreignKey: 'transporterId',
        as: 'transporter',
      });
      Booking.belongsTo(models.Shipment, {
        foreignKey: 'shipmentId',
        as: 'shipment',
      });
    };
  
    return Booking;
  };
  