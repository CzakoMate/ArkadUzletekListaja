import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const openHoursTables = await dbQuery("SELECT * FROM openHoursTables;");
    res.status(200).json(openHoursTables);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [openHoursTable] = await dbQuery(
      "SELECT * FROM openHoursTables WHERE id = ?;",
      [req.params.id]
    );
    if (!openHoursTable)
      return res.status(404).json({ message: "OpenHoursTable not found" });
    res.status(200).json(openHoursTable);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO openHoursTables (pageId, s1o1, s1o2, s2o1, s2o2, s3o1, s3o2) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        req.body.pageId,
        req.body.s1o1,
        req.body.s1o2,
        req.body.s2o1,
        req.body.s2o2,
        req.body.s3o1,
        req.body.s3o2,
      ]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [openHoursTable] = await dbQuery(
      "SELECT * FROM openHoursTables WHERE id = ?;",
      [req.params.id]
    );
    if (!openHoursTable)
      return res.status(404).json({ message: "OpenHoursTable not found" });

    await dbRun(
      "UPDATE openHoursTables SET pageID = ?, s1o1 =?, s1o2 = ?, s2o1= ?, s2o2 = ?, s3o1 = ?, s3o2 = ? WHERE id = ?;",
      [
        req.body.pageId || openHoursTable.pageId,
        req.body.s1o1 || openHoursTable.s1o1,
        req.body.s1o2 || openHoursTable.s1o2,
        req.body.s2o1 || openHoursTable.s2o1,
        req.body.s2o2 || openHoursTable.s2o2,
        req.body.s3o1 || openHoursTable.s3o1,
        req.body.s3o2 || openHoursTable.s3o2,
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
    const [openHoursTable] = await dbQuery(
      "SELECT * FROM openHoursTables WHERE id = ?;",
      [req.params.id]
    );
    if (!openHoursTable)
      return res.status(404).json({ message: "openHoursTable not found" });

    await dbRun("DELETE FROM openHoursTables WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
