// controllers/shipmentController.js
const { Shipment, City, User } = require('../models');

// Créer un envoi
const createShipment = async (req, res) => {
  try {
    const { departureCityId, arrivalCityId, weight, status } = req.body;

    const newShipment = await Shipment.create({
      departureCityId,
      arrivalCityId,
      weight,
      status
    });

    res.status(201).json(newShipment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Obtenir tous les envois
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      include: [
        { model: City, as: 'departureCity' },
        { model: City, as: 'arrivalCity' },
        { model: User, as: 'user' },
      ],
    });
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Obtenir un envoi par ID
const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id, {
      include: [
        { model: City, as: 'departureCity' },
        { model: City, as: 'arrivalCity' },
        { model: User, as: 'user' },
      ],
    });
    if (!shipment) {
      return res.status(404).json({ message: 'Envoi non trouvé' });
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Mettre à jour un envoi
const updateShipment = async (req, res) => {
  try {
    const { departureCityId, arrivalCityId, weight, status } = req.body;

    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Envoi non trouvé' });
    }

    if (req.user.role !== 'admin' && shipment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await shipment.update({ departureCityId, arrivalCityId, weight, status });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Supprimer un envoi
const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Envoi non trouvé' });
    }

    if (req.user.role !== 'admin' && shipment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await shipment.destroy();
    res.status(200).json({ message: 'Envoi supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
};
