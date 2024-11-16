'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cities', 'country', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    
    await queryInterface.addColumn('Cities', 'postalCode', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cities', 'country');
    await queryInterface.removeColumn('Cities', 'postalCode');
  }
};
