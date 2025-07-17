module.exports = (sequelize, DataTypes) => {
	const Society = sequelize.define('Society', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		registrationNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		directorFirstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		directorLastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		directorNationality: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	});

	Society.associate = (models) => {
		Society.hasMany(models.User, {
			foreignKey: 'societyId',
			as: 'users',
		});
	};
	Society.associate = (models) => {
		Society.hasMany(models.User, {
			foreignKey: 'societyId',
			as: 'users',
		});
	};
	return Society;
};
