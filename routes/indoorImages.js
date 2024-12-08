import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const indoorImages = await dbQuery("SELECT * FROM indoorImages;");
    res.status(200).json(indoorImages);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [indoorImage] = await dbQuery(
      "SELECT * FROM indoorImages WHERE id = ?;",
      [req.params.id]
    );
    if (!indoorImage)
      return res.status(404).json({ message: "IndoorImage not found" });
    res.status(200).json(indoorImage);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO indoorImages (pageId, src, alt) VALUES (?, ?, ?);",
      [req.body.pageId, req.body.src, req.body.alt]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [indoorImage] = await dbQuery(
      "SELECT * FROM indoorImages WHERE id = ?;",
      [req.params.id]
    );
    if (!indoorImage)
      return res.status(404).json({ message: "IndoorImage not found" });

    await dbRun(
      "UPDATE indoorImages SET pageId = ?, src = ?, alt = ? WHERE id = ?;",
      [
        req.body.pageId || indoorImage.pageId,
        req.body.src || indoorImage.src,
        req.body.alt || indoorImage.alt,
        req.params.id,
      ]
    );
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [indoorImage] = await dbQuery(
      "SELECT * FROM indoorImages WHERE id = ?;",
      [req.params.id]
    );
    if (!indoorImage)
      return res.status(404).json({ message: "IndoorImage not found" });

    await dbRun("DELETE FROM indoorImages WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
