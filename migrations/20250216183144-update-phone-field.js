'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone'); // ✅ Supprimer l'ancienne colonne
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.JSON, // ✅ Ajouter la nouvelle colonne en JSON
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone'); // ✅ Supprimer la colonne JSON si on annule la migration
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING, // ✅ Revenir à l'ancienne structure si nécessaire
      allowNull: true,
    });
  }
};
