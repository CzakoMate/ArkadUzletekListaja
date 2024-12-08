import express from "express";
import { dbQuery } from "../database.js";

const generateDynamicRoutes = async (app) => {
    try {
        const pages = await dbQuery("SELECT pageTitle FROM pages;");
        const pageTitles = pages.map(page => page.pageTitle);

        pageTitles.forEach(title => {
            const route = `/api/pages/${title.replace(/á/g, "a")
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
                .replace(/\s+/g, "-")}`;
            app.get(route, async (req, res, next) => {
                try {
                    const page = await dbQuery("SELECT * FROM page WHERE pageTitle = ?;", [title]);
                    res.status(200).json(page);
                } catch (err) {
                    next(err);
                }
            });

            console.log(`Route created: GET ${route}`);
        });
    } catch (err) {
        console.error("Error generating dynamic routes:", err);
    }
};

export default generateDynamicRoutes;
