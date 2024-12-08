import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
  try {
    await dbRun(
      "CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, pageTitle TEXT);"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, src TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS introductions (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, text TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS openHoursTables (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, s1o1 TEXT, s1o2 TEXT, s2o1 TEXT, s2o2 TEXT, s3o1 TEXT, s3o2 TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS sideDivs (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, telNum TEXT, email TEXT, webpage TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS indoorImages (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, src TEXT, alt TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    await dbRun(
      "CREATE TABLE IF NOT EXISTS locationImages (id INTEGER PRIMARY KEY AUTOINCREMENT, pageId INTEGER, src TEXT, FOREIGN KEY (pageId) REFERENCES page(id));"
    );
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
};
/*
const insertData = async (jsonData) => {
  try {
    const { pageTitle, data } = jsonData;
    const {
      Image,
      Introduction,
      openHours,
      sideDiv,
      indoorImages,
      locationImage,
    } = data;
    await dbRun("INSERT INTO page (pageTitle) VALUES (?);", [pageTitle]);
    const page = await dbRun("SELECT last_insert_rowid() AS id;");
    const pageId = page.id;
    await dbRun("INSERT INTO image (pageId, src) VALUES (?, ?);", [
      pageId,
      Image.src,
    ]);
    for (const text of Introduction) {
      await dbRun("INSERT INTO introduction (pageId, text) VALUES (?, ?);", [
        pageId,
        text,
      ]);
    }
    await dbRun(
      "INSERT INTO openHours (pageId, s1o1, s1o2, s2o1, s2o2, s3o1, s3o2) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        pageId,
        openHours.s1o1,
        openHours.s1o2,
        openHours.s2o1,
        openHours.s2o2,
        openHours.s3o1,
        openHours.s3o2,
      ]
    );
    await dbRun(
      "INSERT INTO sideDiv (pageId, telNum, email, webpage) VALUES (?, ?, ?, ?);",
      [pageId, sideDiv.telNum, sideDiv.email, sideDiv.webpage]
    );
    for (const image of indoorImages) {
      await dbRun(
        "INSERT INTO indoorImages (pageId, src, alt) VALUES (?, ?, ?);",
        [pageId, image.src, image.alt]
      );
    }
    for (const locImg of locationImage) {
      await dbRun("INSERT INTO locationImage (pageId, src) VALUES (?, ?);", [
        pageId,
        locImg.src,
      ]);
    }
    console.log("Data inserted successfully for pageTitle:", pageTitle);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};*/

function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export { db, dbQuery, dbRun, initializeDB };
