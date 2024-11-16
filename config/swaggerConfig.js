const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',  // Version de Swagger
    info: {
      title: 'My API',  // Nom de l'API
      description: 'Documentation de l\'API',  // Description de l'API
      version: '1.0.0',  // Version de l'API
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',  // Type d'authentification
          bearerFormat: 'JWT',  // Format du token
        },
      },
    },
    security: [
      {
        bearerAuth: [],  // Cette sécurité s'applique globalement à toutes les routes
      },
    ],
  },
  apis: ['./routes/*.js'],  // Recherche des annotations Swagger dans le dossier des routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      authAction: {
        bearerAuth: {
          name: 'bearerAuth',  // Le nom du schéma de sécurité (doit correspondre à celui défini dans securitySchemes)
          schema: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: '',  // Par défaut, vide, l'utilisateur devra entrer un token
        },
      },
    },
  }));
};
