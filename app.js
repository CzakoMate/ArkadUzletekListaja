import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Load the JSON data
const uzletekData = JSON.parse(fs.readFileSync(path.join(__dirname, './public/data', 'Uzletek.json'), 'utf-8'));

// Define the /minta route to list all items
app.get('/', (req, res) => {
  res.render('Fooldal', { pageTitle: 'Főoldal', uzletek: uzletekData });
});

// Define a route for "Ametiszt Ruhatisztító"
app.get('/Ametiszt-Ruhatisztító', (req, res) => {
  res.render('ametiszt', { pageTitle: 'Ametiszt Ruhatisztító' });
});

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

app.listen(PORT, () => console.log(`Server listens on http://localhost:${PORT}`));
