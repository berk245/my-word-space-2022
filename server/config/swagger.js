const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Word Space",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://api.berkozzambak.online",
      }
    ],
  },
  apis: ["../routes/*.js"],
};

module.exports = swaggerJsDoc(options);
