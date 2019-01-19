const express = require('express')
const app = express()
const port = 3000
const path = require("path");
var rp = require('request-promise');
var $ = require("cheerio");
const url = 'https://dribbble.com/colors/174a47';

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/p5', function (req, res) {
    res.sendFile(path.join(__dirname + '/p5.js'));
});

app.get('/data', (req, res) => {
    rp(url)
        .then(function (html) {
            const imgUrls = [];
            for (let i = 0; i < 20; i++) {
                imgUrls.push($('picture > img', html)[i].attribs.src);
            }
            res.send(imgUrls);
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.listen(port, () => console.log("Example app listening on port ${port}!"))