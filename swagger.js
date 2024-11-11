const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Trello API',
            version: '1.0.0',
            description: 'API for managing users (CRUD operations)',
        },
        servers: [
            {
                url: 'https://trello-backend-seven.vercel.app', // Vercel URL
            },
        ],
        security: [
            {
                bearerAuth: [] // Enable Bearer token authentication
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Path to your API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

function swaggerSetup(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = swaggerSetup;
