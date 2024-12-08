import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const locationImages = await dbQuery("SELECT * FROM locationImages;");
    res.status(200).json(locationImages);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [locationImage] = await dbQuery(
      "SELECT * FROM locationImages WHERE id = ?;",
      [req.params.id]
    );
    if (!locationImage)
      return res.status(404).json({ message: "locationImage not found" });
    res.status(200).json(locationImage);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO locationImages (pageId, src) VALUES (?, ?);",
      [req.body.pageId, req.body.src]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [locationImage] = await dbQuery(
      "SELECT * FROM locationImages WHERE id = ?;",
      [req.params.id]
    );
    if (!locationImage)
      return res.status(404).json({ message: "locationImage not found" });

    await dbRun("UPDATE locationImages SET pageId = ?, src = ? WHERE id = ?;", [
      req.body.pageId || locationImage.pageId,
      req.body.src || locationImage.src,
      req.params.id,
    ]);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [locationImage] = await dbQuery(
      "SELECT * FROM locationImages WHERE id = ?;",
      [req.params.id]
    );
    if (!locationImage)
      return res.status(404).json({ message: "locationImage not found" });

    await dbRun("DELETE FROM locationImages WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
