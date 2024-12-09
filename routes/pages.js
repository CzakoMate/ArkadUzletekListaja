import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pages = await dbQuery("SELECT * FROM pages;");
    res.status(200).json(pages);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [page] = await dbQuery("SELECT * FROM pages WHERE id = ?;", [
      req.params.id,
    ]);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.status(200).json(page);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun("INSERT INTO pages (pageTitle) VALUES (?);", [
      req.body.pageTitle,
    ]);
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [page] = await dbQuery("SELECT * FROM pages WHERE id = ?;", [
      req.params.id,
    ]);
    if (!page) return res.status(404).json({ message: "Page not found" });

    await dbRun("UPDATE pages SET pageTitle = ?, WHERE id = ?;", [
      req.body.pageTitle || page.pageTitle,
      req.params.id,
    ]);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [page] = await dbQuery("SELECT * FROM pages WHERE id = ?;", [
      req.params.id,
    ]);
    if (!page) return res.status(404).json({ message: "Page not found" });

    await dbRun("DELETE FROM pages WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
