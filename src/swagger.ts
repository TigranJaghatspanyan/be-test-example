import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import { UserSchema } from "./components/schemas/User";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "My test API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerSetup = express.Router();
swaggerSetup.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerSetup;
