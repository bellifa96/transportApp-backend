'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			societyId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Societies',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			userType: {
				type: Sequelize.ENUM('PRIVATE', 'PROFESSIONAL'),
				allowNull: false,
			},
			firstname: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastname: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			birthDate: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			phone: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			profilePicture: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roles: {
				type: Sequelize.JSON,
				allowNull: false,
				defaultValue: ['SENDER'],
			},
			terms: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		// Supprimer l'ENUM userType avant de dropper la table (important en PostgreSQL)
		return queryInterface.dropTable('Users').then(() => {
			return queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_userType";');
		});
	},
};
