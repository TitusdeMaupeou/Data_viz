const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const csv = require("csvtojson");
const geolib = require('geolib');
const cities = require("all-the-cities")
//var jsondata = undefined;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/app', function (req, res) {
    res.sendFile(path.join(__dirname + '/app.js'));
});

app.get('/app2', function (req, res) {
    res.sendFile(path.join(__dirname + '/app2.js'));
});

app.get('/d3', function (req, res) {
    res.sendFile(path.join(__dirname + '/d3.js'));
});

app.get('/data', function (req, res) {
    res.send(jsondata);
});

/*
var geolibArray = [];
app.get('/nearest/:id', function (req, res) {
    var id = req.params.id;
    //console.log(jsondata[req.params.id])
    for(var i = 0; i < jsondata.length; i++) {
        var name = jsondata[i].name;
        var longitude = jsondata[i].longitude;
        var latitude = jsondata[i].latitude;
        obj = {
            latitude: latitude,
            longitude: longitude
        }
        geolibArray.push(obj)
    }

    var clickedObj = geolibArray[2];

    console.log(clickedObj);
    //geolib.findNearest({latitude: position.coords.latitude, longitude: position.coords.longitude}, officeLocations);
    var nearestPub = geolib.findNearest(clickedObj, geolibArray, 1);
    console.log('The nearest pub is' + nearestPub);
    res.send(nearestPub);
});
*/

cities.filter(city => {
    return city.name.match('Brussel');
})



function init() {
    csv()
        .fromFile("./data/open_pubs.csv")
        .then((parsed) => {
            jsondata = parsed;
            app.listen(port, () => console.log(`Data viz app listening on port ${port}!`));
        }, (error) => {
            console.log(error);
        })
};

init();