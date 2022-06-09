const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express()
const port = process.env.PORT || 3000
const authorization = require('./middleware/authentication')
require('dotenv').config()

process.title = "whatsapp-node-api";

global.client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
    ]},
});

global.authed = false;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`API is running...`))
app.use(authorization);

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on("authenticated", () => {
    console.log("Authenticated");
    authed = true;
    try {
        fs.unlinkSync("./components/last.qr");
    } catch (err) {}
});

client.on("auth_failure", () => {
    console.log("AUTH Failed !");
    process.exit();
});

client.on('ready', () => {
    console.log('Client is ready');
});

client.on("disconnected", () => {
    console.log("disconnected");
});

client.initialize();

app.use('/', routes)