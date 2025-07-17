// controllers/userController.js
const { User,Society } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
	const { email, password, firstname, lastname, phone, roles, userType, birthDate, terms, campany } = req.body;

	console.log(email, password, firstname, lastname, phone, roles, userType, birthDate, terms, campany);

	try {
		// Vérifier si l'email existe déjà
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: 'User with this email already exists' });
		}

		// Si la société est présente dans la requête → créer la société
		let societyId = null;
		if (campany?.companyName) {
      console.log("ici")
			const createdSociety = await Society.create({
				name: campany.companyName,
				registrationNumber: campany.registrationNumber,
				phone: campany.companyPhone,
				directorFirstname: firstname,
				directorLastname: lastname,
				directorNationality: campany.directorNationality, // ou récupéré d’un champ si dispo
			});
      console.log(createdSociety)

			societyId = createdSociety.id;
		}

		// Création du nouvel utilisateur
		const newUser = await User.create({
			email: email,
			societyId: societyId,
			password: password,
			firstname: firstname,
			lastname: lastname,
			phone: phone,
			roles: roles || ['client'], // corriger: tableau attendu
			userType: userType,
			birthDate: birthDate,
			terms: terms,
		});

		// Génération du token JWT
		const token = jwt.sign({ id: newUser.id, email: newUser.email, roles: newUser.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(201).json({
			message: 'User created and logged in successfully',
			token,
			user: {
				id: newUser.id,
				email: newUser.email,
				firstname: newUser.firstname,
				lastname: newUser.lastname,
				phone: newUser.phone,
				profilePicture: newUser.profilePicture,
				roles: newUser.roles,
				userType: newUser.userType,
				birthDate: newUser.birthDate,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Vérifier si l'utilisateur existe
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email' });
		}

		console.log(user, password);
		// Comparer le mot de passe fourni avec le mot de passe haché stocké
		const isMatch = await bcrypt.compare(password, user.password);

		console.log(isMatch);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		console.log(process.env.JWT_SECRET); // Génération du token JWT
		const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
			expiresIn: '1h', // Le token expirera dans 1 heure
		});
		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				roles: user.roles,
				phone: user.phone,
				profilePicture: user.profilePicture,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const updateProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const { firstname, lastname, phone } = req.body;
		let profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

		// Vérifier si l'utilisateur existe
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé' });
		}

		// Mettre à jour les informations
		user.firstname = firstname || user.firstname;
		user.lastname = lastname || user.lastname;
		user.phone = phone || user.phone;
		if (profilePicture) user.profilePicture = profilePicture;

		await user.save();

		res.json({
			message: 'Profil mis à jour avec succès',
			user: {
				id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				roles: user.roles,
				phone: user.phone,
				profilePicture: user.profilePicture,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la mise à jour du profil :', error);
		res.status(500).json({ message: 'Erreur serveur', error });
	}
};

module.exports = {
	login,
	createUser,
	updateProfile,
};
