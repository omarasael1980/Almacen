import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API for products in a store"
      }
    ],
    info: {
      title: 'MyAlmacen NodeJS||Typescript API',
      version: "1.0.0",
      description: "my first API with typescript",
    },
  },
  apis: ["./src/routes/*.ts"], // Esto debe estar fuera de `definition`
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
