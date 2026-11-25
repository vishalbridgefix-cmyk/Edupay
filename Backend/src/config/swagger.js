
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Edupay API Documentation",
            version: "1.0.0",
            description: "API documentation for Edupay application"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
    path.resolve(__dirname, "../routes/*.js").replace(/\\/g, "/")
]
};

const swaggerSpec = swaggerJsdoc(options);
console.log("Swagger API files:", options.apis);
console.log("Swagger API paths:", Object.keys(swaggerSpec.paths || {}));

export default swaggerSpec;
