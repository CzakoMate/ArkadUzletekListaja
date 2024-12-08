import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sideDivs = await dbQuery("SELECT * FROM sideDivs;");
    res.status(200).json(sideDivs);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [sideDiv] = await dbQuery("SELECT * FROM sideDivs WHERE id = ?;", [
      req.params.id,
    ]);
    if (!sideDiv) return res.status(404).json({ message: "SideDiv not found" });
    res.status(200).json(sideDiv);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO sideDivs (pageId, telNum, email, webpage) VALUES (?, ?, ?, ?);",
      [req.body.pageId, req.body.telNum, req.body.email, req.body.webpage]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [sideDiv] = await dbQuery("SELECT * FROM sideDivs WHERE id = ?;", [
      req.params.id,
    ]);
    if (!sideDiv) return res.status(404).json({ message: "SideDiv not found" });

    await dbRun(
      "UPDATE sideDivs SET pageId = ?, telNum = ?, email = ?, webpage = ? WHERE id = ?;",
      [
        req.body.pageId || sideDiv.pageId,
        req.body.telNum || sideDiv.telNum,
        req.body.email || sideDiv.email,
        req.body.webpage || sideDiv.webpage,
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
    const [sideDiv] = await dbQuery("SELECT * FROM sideDivs WHERE id = ?;", [
      req.params.id,
    ]);
    if (!sideDiv) return res.status(404).json({ message: "SideDiv not found" });

    await dbRun("DELETE FROM sideDivs WHERE id = ?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
