// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour créer un utilisateur
const createUser = async (req, res) => {
  const { email, password, firstName, lastName, phone, profilePhoto,role } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Créer le nouvel utilisateur
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      profilePhoto,
      role: role || 'client', // Définit le rôle par défaut à 'client' si aucun n'est fourni
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
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

    // Comparer le mot de passe fourni avec le mot de passe haché stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }


    console.log( process.env.JWT_SECRET)    // Génération du token JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Le token expirera dans 1 heure
    });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role:user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  login,
  createUser
};

