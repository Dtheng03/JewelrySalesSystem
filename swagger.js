const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jewelry Sales System',
            version: '1.0.0',
            description: 'API Information',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT Bearer token'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        tags: [
            {
                name: 'Categories',
            },
            {
                name: 'Customers',
            },
            {
                name: 'Employees',
            },
            {
                name: 'Order Details',
            },
            {
                name: 'Orders',
            },
            {
                name: 'Products',
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs
};

