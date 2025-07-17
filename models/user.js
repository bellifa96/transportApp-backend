const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userType: {
			type: DataTypes.ENUM('PRIVATE', 'PROFESSIONAL'),
			allowNull: false,
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: true, // facultatif pour l’instant
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		profilePicture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roles: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: ['SENDER'],
		},
		societyId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Societies',
				key: 'id',
			},
		},
	});

	// Avant la création d'un utilisateur, hasher le mot de passe
	User.beforeCreate(async (user) => {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	});

	User.associate = (models) => {
		User.belongsTo(models.Society, {
			foreignKey: 'societyId',
			as: 'society',
		});
	};
	return User;
};
