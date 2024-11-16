const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware pour vérifier si l'utilisateur est admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Accès refusé, token manquant' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé, vous devez être admin' });
    }

    req.user = user; // L'utilisateur est stocké dans la requête
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Middleware pour vérifier si l'utilisateur est transporteur ou admin
const authorizeTransporteurOrAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Accès refusé, token manquant' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'transporteur' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé, vous devez être transporteur ou admin' });
    }

    req.user = user; // L'utilisateur est stocké dans la requête
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Middleware pour vérifier si l'utilisateur est un client
const authorizeClient = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Accès refusé, token manquant' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'client' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé, vous devez être client' });
    }

    req.user = user; // L'utilisateur est stocké dans la requête
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Middleware pour vérifier si l'utilisateur est client ou transporteur
const authorizeClientOrTransporteur = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Accès refusé, token manquant' });
    }

    console.log(token,process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'client' && user.role !== 'transporteur' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé, vous devez être client ou transporteur' });
    }

    req.user = user; // L'utilisateur est stocké dans la requête
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};
module.exports = {
  authorizeAdmin,
  authorizeTransporteurOrAdmin,
  authorizeClient,
  authorizeClientOrTransporteur
};
