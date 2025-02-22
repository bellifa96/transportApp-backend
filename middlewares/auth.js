const jwt = require('jsonwebtoken');
const { User } = require('../models');


/**
 * Vérifie et décode un token JWT.
 * @param {string} token - Le token JWT à vérifier.
 * @returns {Promise<{ user: object, error: object }>}
 */
const verifyToken = async (token) => {
  if (!token) {
    return { error: { status: 401, message: 'Accès refusé, token manquant.' } };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return { error: { status: 404, message: 'Utilisateur non trouvé.' } };
    }

    return { user };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: { status: 401, message: 'Token expiré. Veuillez vous reconnecter.' } };
    }

    return { error: { status: 401, message: 'Token invalide.' } };
  }
};

// Middleware pour vérifier si l'utilisateur est admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({ message: 'Accès refusé, token manquant' });
    }

    const { user, error } = await verifyToken(token);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

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

    const { user, error } = await verifyToken(token);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

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

    const { user, error } = await verifyToken(token);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

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

    const { user, error } = await verifyToken(token);
    console.log(error)

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

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
