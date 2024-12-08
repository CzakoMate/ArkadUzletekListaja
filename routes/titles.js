import express from "express";
import { dbQuery } from "../database.js";

const router = express.Router();

router.get("/fooldal", async (req, res, next) => {
  try {
    const pages = await dbQuery("SELECT pageTitle FROM page;");
    const uzletek = pages.map((page) => page.pageTitle);
    res.render("Fooldal", { pageTitle: "Főoldal", uzletek: uzletek });
  } catch (err) {
    next(err);
  }
});

export default router;
