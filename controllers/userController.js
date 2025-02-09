// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Fonction pour créer un utilisateur et le connecter immédiatement
const createUser = async (req, res) => {
  const { email, password, firstName, lastName, phone, role } = req.body;
  let profilePicture = req.file ? `/uploads/${req.file.filename}` : null; // Récupère le chemin de la photo

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Création du nouvel utilisateur
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      profilePicture,
      role: role || 'client',
    });

    // Génération du token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retourne les mêmes données qu'un login
    res.status(201).json({
      message: 'User created and logged in successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        profilePicture: newUser.profilePicture,
        role: newUser.role,
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

    console.log(user,password)
    // Comparer le mot de passe fourni avec le mot de passe haché stocké
    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }


    console.log( process.env.JWT_SECRET )    // Génération du token JWT
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
    const { firstName, lastName, phone } = req.body;
    let profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role:user.role,
        phone: user.phone,
        profilePicture: user.profilePicture,
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


module.exports = {
  login,
  createUser,
  updateProfile
};

