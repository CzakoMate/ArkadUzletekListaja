import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const images = await dbQuery("SELECT * FROM images;");
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [image] = await dbQuery("SELECT * FROM images WHERE id = ?;", [
      req.params.id,
    ]);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json(image);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO images (pageId, src) VALUES (?, ?);",
      [req.body.pageId, req.body.src]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [image] = await dbQuery("SELECT * FROM images WHERE id = ?;", [
      req.params.id,
    ]);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await dbRun("UPDATE images SET pageId = ?, src = ? WHERE id = ?;", [
      req.body.pageId || image.pageId,
      req.body.src || image.src,
      req.params.id,
    ]);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [image] = await dbQuery("SELECT * FROM images WHERE id = ?;", [
      req.params.id,
    ]);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await dbRun("DELETE FROM images WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
