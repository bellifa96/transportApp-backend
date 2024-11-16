// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authorizeTransporteurOrAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Créer une réservation pour un transporteur
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipmentId:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post('/', authorizeTransporteurOrAdmin, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Obtenir toutes les réservations pour le transporteur connecté
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', authorizeTransporteurOrAdmin, bookingController.getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur du serveur
 */
router.put('/:id', authorizeTransporteurOrAdmin, bookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur du serveur
 */
router.delete('/:id', authorizeTransporteurOrAdmin, bookingController.deleteBooking);

module.exports = router;
