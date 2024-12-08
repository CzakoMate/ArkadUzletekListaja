import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const introductions = await dbQuery("SELECT * FROM introductions;");
    res.status(200).json(introductions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [introduction] = await dbQuery(
      "SELECT * FROM introductions WHERE id = ?;",
      [req.params.id]
    );
    if (!introduction)
      return res.status(404).json({ message: "Introduction not found" });
    res.status(200).json(introduction);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO introductions (pageId, text) VALUES (?, ?);",
      [req.body.pageId, req.body.text]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [introduction] = await dbQuery(
      "SELECT * FROM introductions WHERE id = ?;",
      [req.params.id]
    );
    if (!introduction)
      return res.status(404).json({ message: "Introduction not found" });

    await dbRun("UPDATE introductions SET pageId = ?, text = ? WHERE id = ?;", [
      req.body.pageId || introduction.pageId,
      req.body.text || introduction.text,
      req.params.id,
    ]);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [introduction] = await dbQuery(
      "SELECT * FROM introductions WHERE id = ?;",
      [req.params.id]
    );
    if (!introduction)
      return res.status(404).json({ message: "Introduction not found" });

    await dbRun("DELETE FROM introductions WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
