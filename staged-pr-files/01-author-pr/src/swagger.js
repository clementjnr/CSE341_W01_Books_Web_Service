import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE 341 Books and Authors API',
      version: '2.0.0',
      description: 'Week 02 Books and Authors API documentation'
    },
    servers: [{ url: '/', description: 'Current server' }]
  },
  apis: ['./src/router.js']
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
