// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Import du middleware Multer
const userController = require('../controllers/userController');
const {authorizeClientOrTransporteur}   = require('../middlewares/auth');

// Définir l'endpoint POST pour créer un utilisateur
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Créer un utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: 123456789
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: '0123456789'
 *               profilePicture:
 *                 type: string
 *                 example: profile-pic.jpg
 *               role:
 *                 type: string
 *                 example: client
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/register', upload.single('profilePicture'), userController.createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Invalid email or password
 *       401:
 *         description: Unauthorized - Incorrect credentials
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Met à jour le profil de l'utilisateur connecté
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+33123456789"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       500:
 *         description: Erreur serveur
 */
router.put('/profile', authorizeClientOrTransporteur , upload.single('profilePicture'), userController.updateProfile);

module.exports = router;
