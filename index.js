const express = require("express");
const storeRoutes = require("./routes/store");
const storeMod = require("./models/store");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    arrayLimit: 5000
  })
);


const db_url = "mongodb://localhost/dbStore";
mongoose.connect(db_url, { userNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.use("/", storeRoutes);
db.on("error", console.error.bind(console, "Error en la conexión"));
db.once("open", function() {
    db.dropDatabase()
    storeMod.create({users:[{
        "username": "room",
        "password":"camp",
        "securityQuestion":{
        "question": "room",
        "answer":"camp"
    }
    }]})
});

app.listen("8080", () => {
  console.log("server up");
});
