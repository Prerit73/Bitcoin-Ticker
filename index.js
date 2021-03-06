//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var baseUrl="https://apiv2.bitcoinaverage.com/indices/global/ticker/"+crypto+fiat;

    request(baseUrl, function (error, response, body) {
        var data = JSON.parse(body);    //converting json in javascript
        var price = data.last;          //last is last price
        var currentDate= data.display_timestamp;
        res.write("<p>The current Date is "+currentDate+"</p>");  // when we use res.send it exit from their.
        res.write("<h1>The current prize of " + crypto+ " is " + price + fiat + "</h1>");
        res.send();
    });
})

app.listen(3000, function () {
    console.log("server is running on port 3000.")
});
