// routes/transporterAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const transporterAvailabilityController = require('../controllers/transporterAvailabilityController');
const { authorizeTransporteurOrAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/transporter-availabilities:
 *   post:
 *     summary: Créer une disponibilité pour un transporteur
 *     tags: [TransporterAvailabilities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departureCityId:
 *                 type: integer
 *               arrivalCityId:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Disponibilité créée avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post('/', authorizeTransporteurOrAdmin, transporterAvailabilityController.createAvailability);

/**
 * @swagger
 * /api/transporter-availabilities:
 *   get:
 *     summary: Obtenir toutes les disponibilités des transporteurs
 *     tags: [TransporterAvailabilities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des disponibilités
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', authorizeTransporteurOrAdmin, transporterAvailabilityController.getAvailabilities);

/**
 * @swagger
 * /api/transporter-availabilities/{id}:
 *   put:
 *     summary: Mettre à jour la disponibilité d'un transporteur
 *     tags: [TransporterAvailabilities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la disponibilité à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departureCityId:
 *                 type: integer
 *               arrivalCityId:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disponibilité mise à jour
 *       404:
 *         description: Disponibilité non trouvée
 *       500:
 *         description: Erreur du serveur
 */
router.put('/:id', authorizeTransporteurOrAdmin, transporterAvailabilityController.updateAvailability);

/**
 * @swagger
 * /api/transporter-availabilities/{id}:
 *   delete:
 *     summary: Supprimer la disponibilité d'un transporteur
 *     tags: [TransporterAvailabilities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la disponibilité à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponibilité supprimée avec succès
 *       404:
 *         description: Disponibilité non trouvée
 *       500:
 *         description: Erreur du serveur
 */
router.delete('/:id', authorizeTransporteurOrAdmin, transporterAvailabilityController.deleteAvailability);

module.exports = router;
