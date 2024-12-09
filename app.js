import path from "path";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import { initializeDB } from "./database.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import imagesRouter from "./routes/images.js";
import indoorImagesRouter from "./routes/indoorImages.js";
import introductionRouter from "./routes/introductions.js";
import locationImagesRouter from "./routes/locationImages.js";
import openHoursTablesRouter from "./routes/openHoursTables.js";
import pagesRouter from "./routes/pages.js";
import sideDivsRouter from "./routes/sideDivs.js";
import dynamicRouter from "./routes/dynamicRoutes.js";
import titlesRouter from "./routes/titles.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const swaggerDocument = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

// Import the swagger-output.json file
const swaggerPath = "./swagger-output.json";
const swaggerData = swaggerDocument(swaggerPath);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use("/api/images", imagesRouter);
app.use("/api/indoorImages", indoorImagesRouter);
app.use("/api/introductions", introductionRouter);
app.use("/api/locationImages", locationImagesRouter);
app.use("/api/openHoursTables", openHoursTablesRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/sideDivs", sideDivsRouter);
/*const OldalAdatokData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./public/data", "OldalAdatok.json"),
    "utf-8"
  )
);*/
/*for (let shop in OldalAdatokData) {
  const route =
    "/" +
    OldalAdatokData[shop].pageTitle
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/ő/g, "o")
      .replace(/ú/g, "u")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ű/g, "u")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/Á/g, "A")
      .replace(/É/g, "E")
      .replace(/Ő/g, "O")
      .replace(/Ú/g, "U")
      .replace(/Ö/g, "O")
      .replace(/Ü/g, "U")
      .replace(/Ű/g, "U")
      .replace(/Í/g, "I")
      .replace(/Ó/g, "O")
      .replace(/\s+/g, "-");

  app.get(route, (req, res, next) => {
    const oldalData = OldalAdatokData[shop];
    if (oldalData) {
      res.render("content", {
        pageTitle: oldalData.pageTitle,
        data: oldalData.data,
      });
    } else {
      res
        .status(404)
        .render("404", { pageTitle: "404-es hiba - Az oldal nem található" });
    }
  });
}*/
/*const shops = [];
for (let shop in OldalAdatokData) {
  shops.push(OldalAdatokData[shop].pageTitle);
}*/
app.use("/", titlesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404-es hiba - Az oldal nem található",
    path: "",
  });
});
const startServer = async () => {
  await initializeDB();
  await dynamicRouter(app);
  app.listen(PORT, () =>
    console.log(`Server listens on http://localhost:${PORT}`)
  );
};
startServer();
