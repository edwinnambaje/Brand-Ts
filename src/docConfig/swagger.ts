import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const swaggerServer = process.env.SWAGGER_SERVER  || "http://localhost:5000/";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'My Brand',
      version: '1.0.0',
      description: 'This is for my Brand',
    },
    servers: [{ url: swaggerServer }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*.js', './src/docs/*.yml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
