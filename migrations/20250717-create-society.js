'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Societies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      directorFirstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      directorLastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      directorNationality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Societies');
  }
};
