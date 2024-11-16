// routes/shipmentRoutes.js
const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const { authorizeTransporteurOrAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Shipments
 *   description: Gestion des envois
 */

/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Créer un nouvel envoi
 *     tags: [Shipments]
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
 *               weight:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Envoi créé avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post('/', authorizeTransporteurOrAdmin, shipmentController.createShipment);

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Obtenir la liste des envois
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des envois
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', authorizeTransporteurOrAdmin, shipmentController.getShipments);

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Obtenir un envoi par ID
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'envoi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envoi trouvé
 *       404:
 *         description: Envoi non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.get('/:id', authorizeTransporteurOrAdmin, shipmentController.getShipmentById);

/**
 * @swagger
 * /api/shipments/{id}:
 *   put:
 *     summary: Mettre à jour un envoi
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'envoi à mettre à jour
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
 *               weight:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Envoi mis à jour
 *       404:
 *         description: Envoi non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.put('/:id', authorizeTransporteurOrAdmin, shipmentController.updateShipment);

/**
 * @swagger
 * /api/shipments/{id}:
 *   delete:
 *     summary: Supprimer un envoi
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'envoi à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Envoi supprimé avec succès
 *       404:
 *         description: Envoi non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.delete('/:id', authorizeTransporteurOrAdmin, shipmentController.deleteShipment);

module.exports = router;
