import path from "path";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const uzletekData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./public/data", "Uzletek.json"),
    "utf-8"
  )
);

app.get("/Ametiszt-Ruhatisztito", (req, res, next) => {
  res.render("ametiszt", { pageTitle: "Ametiszt Ruhatisztító" });
});
app.get("/Amnesia", (req, res, next) => {
  res.render("Amnesia", { pageTitle: "Amnesia" });
});
app.get("/Apacs-Ezust-Ekszer", (req, res, next) => {
  res.render("apacs", { pageTitle: "Apacs Ezüst Ékszer" });
});

app.get('/Balance', (req, res, next) => {
  res.render('balance', { pageTitle: 'Balance' });
});

app.get('/Barber-Shop-Budapest', (req, res, next) => {
  res.render('barber', { pageTitle: 'Barber Shop Budapest' });
});

app.get('/Benu-Gyogyszertar', (req, res, next) => {
  res.render('benu', { pageTitle: 'Benu Gyógyszertár' });
});

app.get('/Bershka', (req, res, next) => {
  res.render('bershka', { pageTitle: 'Bershka' });
});

app.get('/Bijou-Brigitte', (req, res, next) => {
  res.render('bijou', { pageTitle: 'Bijou Brigitte' });
});

app.get('/Bio-Barat-Biobolt', (req, res, next) => {
  res.render('bio', { pageTitle: 'Bio-Barát Biobolt' });
});

app.get('/BioHair-Szalon', (req, res, next) => {
  res.render('biohair', { pageTitle: 'BioHair Szalon' });
});

app.get('/BioTechUSA', (req, res, next) => {
  res.render('biotech', { pageTitle: 'BioTechUSA' });
});

app.get('/Bonanza-Jeans', (req, res, next) => {
  res.render('bonanza', { pageTitle: 'Bonanza Jeans' });
});

app.get('/budmil-Store', (req, res, next) => {
  res.render('budmil', { pageTitle: 'budmil Store' });
});

app.get('/BUZZ', (req, res, next) => {
  res.render('buzz', { pageTitle: 'BUZZ' });
});

app.get('/C&A', (req, res, next) => {
  res.render('ca', { pageTitle: 'C&A' });
});

app.get('/Calzedonia', (req, res, next) => {
  res.render('calzedonia', { pageTitle: 'Calzedonia' });
});

app.get('/camel-active', (req, res, next) => {
  res.render('camel', { pageTitle: 'camel active' });
});

app.get('/CCC', (req, res, next) => {
  res.render('ccc', { pageTitle: 'CCC' });
});

app.get(`/Claire's`, (req, res, next) => {
  res.render('claires', { pageTitle: 'Claire\'s' });
});

app.get('/CROPP', (req, res, next) => {
  res.render('cropp', { pageTitle: 'CROPP' });
});

app.get('/Deichmann', (req, res, next) => {
  res.render('deichmann', { pageTitle: 'Deichmann' });
});

app.get('/Devergo-&-Friends', (req, res, next) => {
  res.render('devergo', { pageTitle: 'Devergo & Friends' });
});

app.get('/Diamond-Ora-ekszer', (req, res, next) => {
  res.render('diamond', { pageTitle: 'Diamond Óra-ékszer' });
});

app.get('/Diamore-Ekszer-Ora', (req, res, next) => {
  res.render('diamore', { pageTitle: 'Diamore Ékszer-Óra' });
});

app.get('/dm', (req, res, next) => {
  res.render('dm', { pageTitle: 'dm' });
});

app.get('/Dockyard', (req, res, next) => {
  res.render('dockyard', { pageTitle: 'Dockyard' });
});

app.get('/Dorko', (req, res, next) => {
  res.render('dorko', { pageTitle: 'Dorko' });
});

app.get('/Douglas-Parfumeria', (req, res, next) => {
  res.render('douglas', { pageTitle: 'Douglas Parfüméria' });
});

app.get('/ELETIZEK-Finomsagbolt-es-Kavezo', (req, res, next) => {
  res.render('eletizek', { pageTitle: 'ÉLETÍZEK Finomságbolt és Kávézó' });
});

app.get('/Exclusive-Change', (req, res, next) => {
  res.render('exclusive', { pageTitle: 'Exclusive Change' });
});

app.get('/Flying-Tiger-Copenhagen', (req, res, next) => {
  res.render('flyingtiger', { pageTitle: 'Flying Tiger Copenhagen' });
});

app.get('/GAS', (req, res, next) => {
  res.render('gas', { pageTitle: 'GAS' });
});

app.get('/Guess', (req, res, next) => {
  res.render('guess', { pageTitle: 'Guess' });
});

app.get('/H&M', (req, res, next) => {
  res.render('hm', { pageTitle: 'H&M' });
});

app.get('/Heavy-Tools', (req, res, next) => {
  res.render('heavytools', { pageTitle: 'Heavy Tools' });
});

app.get('/Herbaria', (req, res, next) => {
  res.render('herbaria', { pageTitle: 'Herbária' });
});

app.get('/Hervis', (req, res, next) => {
  res.render('hervis', { pageTitle: 'Hervis' });
});

app.get('/House', (req, res, next) => {
  res.render('house', { pageTitle: 'House' });
});

app.get('/Humanic', (req, res, next) => {
  res.render('humanic', { pageTitle: 'Humanic' });
});

app.get('/Idozona-Oramania-Szerviz', (req, res, next) => {
  res.render('idozona', { pageTitle: 'Időzóna Óramánia Szerviz' });
});

app.get('/Idozona-Oraszalon', (req, res, next) => {
  res.render('idozonaszalon', { pageTitle: 'Időzóna Óraszalon' });
});

app.get('/Intimissimi', (req, res, next) => {
  res.render('intimissimi', { pageTitle: 'Intimissimi' });
});

app.get('/iSTYLE', (req, res, next) => {
  res.render('istyle', { pageTitle: 'iSTYLE' });
});

app.get('/iWash-autokozmetika', (req, res, next) => {
  res.render('iwash', { pageTitle: 'iWash autókozmetika' });
});

app.get('/Jack-&-Jones', (req, res, next) => {
  res.render('jackjones', { pageTitle: 'Jack & Jones' });
});

app.get('/Libri', (req, res, next) => {
  res.render('libri', { pageTitle: 'Libri' });
});

app.get('/Liliput-Jatekvilag', (req, res, next) => {
  res.render('liliput', { pageTitle: 'Liliput Játékvilág' });
});

app.get('/Lottozo', (req, res, next) => {
  res.render('lottozo', { pageTitle: 'Lottózó' });
});

app.get('/Mayo-Chix', (req, res, next) => {
  res.render('mayo', { pageTitle: 'Mayo Chix' });
});

app.get('/Media-Markt', (req, res, next) => {
  res.render('media', { pageTitle: 'Media Markt' });
});

app.get('/Mister-Minit', (req, res, next) => {
  res.render('misterminit', { pageTitle: 'Mister Minit' });
});

app.get('/MK-Leder-Bordiszmu', (req, res, next) => {
  res.render('mkleder', { pageTitle: 'MK Leder Bőrdíszmű' });
});

app.get('/Muller', (req, res, next) => {
  res.render('muller', { pageTitle: 'Müller' });
});

app.get('/Muyoso', (req, res, next) => {
  res.render('muyoso', { pageTitle: 'Muyoso' });
});

app.get('/Nail-Express', (req, res, next) => {
  res.render('nailexpress', { pageTitle: 'Nail Express' });
});

app.get('/New-Yorker', (req, res, next) => {
  res.render('newyorker', { pageTitle: 'New Yorker' });
});

app.get('/Office-Shoes', (req, res, next) => {
  res.render('officeshoes', { pageTitle: 'Office Shoes' });
});

app.get('/Ofotert', (req, res, next) => {
  res.render('ofotert', { pageTitle: 'Ofotért' });
});

app.get('/Optic-World-Exclusive', (req, res, next) => {
  res.render('opticworld', { pageTitle: 'Optic World Exclusive' });
});

app.get('/Origo-Sport', (req, res, next) => {
  res.render('origosport', { pageTitle: 'Origo Sport' });
});

app.get('/OTP-Bank', (req, res, next) => {
  res.render('otp', { pageTitle: 'OTP Bank' });
});

app.get('/Pandora-Hivatalos-Viszontelado', (req, res, next) => {
  res.render('pandora', { pageTitle: 'Pandora Hivatalos Viszonteladó' });
});

app.get('/Parfois', (req, res, next) => {
  res.render('parfois', { pageTitle: 'Parfois' });
});

app.get('/Party-Point', (req, res, next) => {
  res.render('partypoint', { pageTitle: 'Party Point' });
});

app.get('/PEPCO', (req, res, next) => {
  res.render('pepco', { pageTitle: 'PEPCO' });
});

app.get('/Pepe-Jeans', (req, res, next) => {
  res.render('pepejeans', { pageTitle: 'Pepe Jeans' });
});

app.get('/Pirex-Papir', (req, res, next) => {
  res.render('pirex', { pageTitle: 'Pirex Papír' });
});

app.get('/Playersroom', (req, res, next) => {
  res.render('playersroom', { pageTitle: 'Playersroom' });
});

app.get('/Polouzem', (req, res, next) => {
  res.render('polouzem', { pageTitle: 'Pólóüzem' });
});

app.get('/Posta', (req, res, next) => {
  res.render('posta', { pageTitle: 'Posta' });
});

app.get('/Pull-&-Bear', (req, res, next) => {
  res.render('pullbear', { pageTitle: 'Pull & Bear' });
});

app.get('/Reserved', (req, res, next) => {
  res.render('reserved', { pageTitle: 'Reserved' });
});

app.get('/Retro-Jeans', (req, res, next) => {
  res.render('retro', { pageTitle: 'Retro Jeans' });
});

app.get('/Rossmann', (req, res, next) => {
  res.render('rossmann', { pageTitle: 'Rossmann' });
});

app.get('/Samsung', (req, res, next) => {
  res.render('samsung', { pageTitle: 'Samsung' });
});

app.get('/Samsung-Experience-Store', (req, res, next) => {
  res.render('samsungstore', { pageTitle: 'Samsung Experience Store' });
});

app.get('/Saxoo-London', (req, res, next) => {
  res.render('saxoo', { pageTitle: 'Saxoo London' });
});

app.get('/Scitec-Nutrition', (req, res, next) => {
  res.render('scitec', { pageTitle: 'Scitec Nutrition' });
});

app.get('/SiNSAY', (req, res, next) => {
  res.render('sinsay', { pageTitle: 'SiNSAY' });
});

app.get('/Sizeer', (req, res, next) => {
  res.render('sizeer', { pageTitle: 'Sizeer' });
});

app.get('/skechers', (req, res, next) => {
  res.render('skechers', { pageTitle: 'skechers' });
});

app.get('/SPAR', (req, res, next) => {
  res.render('spar', { pageTitle: 'SPAR' });
});

app.get('/Springfield', (req, res, next) => {
  res.render('springfield', { pageTitle: 'Springfield' });
});

app.get('/Stradivarius', (req, res, next) => {
  res.render('stradivarius', { pageTitle: 'Stradivarius' });
});

app.get('/Takko-Fashion', (req, res, next) => {
  res.render('takko', { pageTitle: 'Takko Fashion' });
});

app.get('/Tamaris', (req, res, next) => {
  res.render('tamaris', { pageTitle: 'Tamaris' });
});

app.get('/Tefal', (req, res, next) => {
  res.render('tefal', { pageTitle: 'Tefal' });
});

app.get('/Telekom', (req, res, next) => {
  res.render('telekom', { pageTitle: 'Telekom' });
});

app.get('/Tezenis', (req, res, next) => {
  res.render('tezenis', { pageTitle: 'Tezenis' });
});

app.get('/Thaifold-Kincse-Masszazs-Szalon', (req, res, next) => {
  res.render('thaifold', { pageTitle: 'Thaiföld Kincse Masszázs Szalon' });
});

app.get('/tokstop', (req, res, next) => {
  res.render('tokstop', { pageTitle: 'tokstop' });
});

app.get('/Tom-Tailor', (req, res, next) => {
  res.render('tomtailor', { pageTitle: 'Tom Tailor' });
});

app.get('/Triumph', (req, res, next) => {
  res.render('triumph', { pageTitle: 'Triumph' });
});

app.get('/Vision-Express', (req, res, next) => {
  res.render('visionexpress', { pageTitle: 'Vision Express' });
});

app.get('/Vodafone', (req, res, next) => {
  res.render('vodafone', { pageTitle: 'Vodafone' });
});

app.get('/W.KRUK', (req, res, next) => {
  res.render('wkruk', { pageTitle: 'W.KRUK' });
});

app.get(`/Women'Secret`, (req, res, next) => {
  res.render('womensecret', { pageTitle: 'Women\'Secret' });
});

app.get('/Wrangler-Mustang', (req, res, next) => {
  res.render('wrangler', { pageTitle: 'Wrangler Mustang' });
});

app.get('/Yettel', (req, res, next) => {
  res.render('yettel', { pageTitle: 'Yettel' });
});

app.get('/Yves-Rocher', (req, res, next) => {
  res.render('yvesrocher', { pageTitle: 'Yves Rocher' });
});

app.get('/Zara', (req, res, next) => {
  res.render('zara', { pageTitle: 'Zara' });
});

app.get('/Zeniche-Parfumeria', (req, res, next) => {
  res.render('zeniche', { pageTitle: 'Zeniche Parfüméria' });
});

app.get("/", (req, res, next) => {
  res.render("Fooldal", { pageTitle: "Főoldal", uzletek: uzletekData });
});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404-es hiba - Az oldal nem található", path: "" });
});

app.listen(PORT, () =>
  console.log(`Server listens on http://localhost:${PORT}`)
);
