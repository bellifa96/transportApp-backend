
const cors = require('cors');
const express = require('express');
const swaggerConfig = require('./config/swaggerConfig');  // Importation de la config Swagger
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes'); // Importer les routes des utilisateurs

app.use(express.json());
swaggerConfig(app);

app.use(cors());

/*app.use(cors({
  origin: 'https://amana-front.bellidev.com', // Accepter uniquement ton frontend
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));*/


// Routes API
app.use('/api/users', userRoutes);
app.use('/api/users/uploads', express.static(path.join(__dirname, 'uploads')));


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
