import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions = {
    definition: {
    openapi: "3.0.0",
    info: {
        title: "MAN Backend API",
        version: "1.0.0",
        description: "Documentación del módulo Users"
    }
    },
    apis: ["./src/routes/*.js"]
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);