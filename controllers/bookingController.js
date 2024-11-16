// controllers/bookingController.js
const { Booking, Shipment, User } = require('../models');

// Créer une réservation
const createBooking = async (req, res) => {
  try {
    const { shipmentId, status } = req.body;

    const shipment = await Shipment.findByPk(shipmentId);
    if (!shipment) {
      return res.status(404).json({ message: 'Envoi non trouvé' });
    }

    const booking = await Booking.create({
      shipmentId,
      transporterId: req.user.id,
      status: status || 'pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Obtenir toutes les réservations pour l'utilisateur connecté
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { transporterId: req.user.id },
      include: [
        { model: Shipment, as: 'shipment' },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Mettre à jour une réservation
const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (booking.transporterId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await booking.update({ status });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

// Supprimer une réservation
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (booking.transporterId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
