const express = require('express');

const fileListener = require("./index");

const app = express();
const PORT = 3002;

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => console.log(`\nConnected to ${PORT}\n`));

fileListener();