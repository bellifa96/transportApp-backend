const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const { authorizeAdmin, authorizeTransporteurOrAdmin,authorizeClientOrTransporteur } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API for managing cities
 */

/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Retrieve a list of cities
 *     description: Retrieve a list of all cities from the database. Accessible to clients and transporters.
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('/', authorizeClientOrTransporteur, cityController.getAllCities);

/**
 * @swagger
 * /api/cities:
 *   post:
 *     summary: Create a new city
 *     description: Add a new city to the database. Accessible only to admins.
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: City created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 country:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request (invalid data)
 *       403:
 *         description: Forbidden, only admins can create cities
 *       500:
 *         description: Internal server error
 */
router.post('/', authorizeAdmin, cityController.createCity);

/**
 * @swagger
 * /api/cities/{id}:
 *   get:
 *     summary: Retrieve a city by its ID
 *     description: Retrieve a single city by its ID from the database. Accessible to clients and transporters.
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the city to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A single city.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 country:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authorizeTransporteurOrAdmin, cityController.getCityById);

/**
 * @swagger
 * /api/cities/{id}:
 *   put:
 *     summary: Update a city by its ID
 *     description: Update the information of an existing city in the database. Accessible only to admins.
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the city to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: City updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 country:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request (invalid data)
 *       403:
 *         description: Forbidden, only admins can update cities
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authorizeAdmin, cityController.updateCity);

/**
 * @swagger
 * /api/cities/{id}:
 *   delete:
 *     summary: Delete a city by its ID
 *     description: Delete an existing city from the database. Accessible only to admins.
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the city to delete.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: City deleted successfully
 *       403:
 *         description: Forbidden, only admins can delete cities
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authorizeAdmin, cityController.deleteCity);

module.exports = router;
