import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OldalAdatokData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./public/data", "OldalAdatok.json"),
    "utf-8"
  )
);
const linkekData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./public/data", "ElsoImgLinkek.json"),
    "utf-8"
  )
);
for (let shop in OldalAdatokData) {
  for (let i = 0; i < linkekData.length; i++) {
    linkekData[i].name = OldalAdatokData[shop].pagetitle;
  }
}
fs.writeFileSync(
  path.join(__dirname, "./public/data", "linkek.json"),
  JSON.stringify(linkekData, null, 2),
  "utf-8"
);
