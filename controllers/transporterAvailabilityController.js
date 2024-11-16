// controllers/transporterAvailabilityController.js
const { TransporterAvailability } = require('../models');

// Créer une disponibilité de transporteur
const createAvailability = async (req, res) => {
  try {
    const { departureCityId, arrivalCityId, status } = req.body;

    const availability = await TransporterAvailability.create({
      departureCityId,
      arrivalCityId,
      status,
      userId: req.user.id, // Associer la disponibilité à l'utilisateur connecté
    });

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Obtenir toutes les disponibilités
const getAvailabilities = async (req, res) => {
  try {
    const availabilities = await TransporterAvailability.findAll({
      where: { userId: req.user.id }, // Associer l'utilisateur connecté
    });
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Mettre à jour la disponibilité du transporteur
const updateAvailability = async (req, res) => {
  try {
    const availability = await TransporterAvailability.findByPk(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: 'Disponibilité non trouvée' });
    }

    if (availability.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await availability.update(req.body);
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Supprimer une disponibilité
const deleteAvailability = async (req, res) => {
  try {
    const availability = await TransporterAvailability.findByPk(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: 'Disponibilité non trouvée' });
    }

    if (availability.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await availability.destroy();
    res.status(200).json({ message: 'Disponibilité supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

module.exports = {
  createAvailability,
  getAvailabilities,
  updateAvailability,
  deleteAvailability,
};
