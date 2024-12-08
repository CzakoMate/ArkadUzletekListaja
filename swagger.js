import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API for managing ArkadUzletek pages data",
  },
  host: "localhost:3000",
  basePath: "/api",
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/images.js",
  "./routes/indoorImages.js",
  "./routes/introductions.js",
  "./routes/locationImages.js",
  "./routes/openHoursTables.js",
  "./routes/pages.js",
  "./routes/sideDivs.js",
];

swaggerAutogen()(outputFile, routes, doc);
