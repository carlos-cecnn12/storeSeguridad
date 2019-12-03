const express = require("express");
const storeRoutes = require("./routes/store");
const storeMod = require("./models/store");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

// EJS
app.engine("html", require("ejs").renderFile);
app.use( express.static('public'));

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
    
    /*storeMod.create({users:[{
        "username": "room",
        "password":"camp",
        "securityQuestion":{
        "question": "room",
        "answer":"camp"
    }
    }]})
    storeMod.create({"products":[{
     "name":"Galaxy Case",
           "price":50,
          "description":"A case for your Galaxy phone"},
           {
           "name":"iPhone Case",
           "price":60,
               "description":"A case for your iPhone"},
               {
                   "name":"Xiaomi Case",
                   "price":30,
                   "description":"A case for your Xiaomi phone"}
       ]})*/
});

app.listen("8080", () => {
  console.log("server up");
});
