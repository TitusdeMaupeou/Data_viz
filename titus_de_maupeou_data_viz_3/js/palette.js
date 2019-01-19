 let img;

 function init() {
     var myp5 = new p5(s, "painting");
 }
 var datarequest = new XMLHttpRequest();
 datarequest.open('GET', '/data', true);
 datarequest.onload = function () {
     var data = JSON.parse(this.response);
     console.log(data);
     let str = "";
     data.forEach(element => {
         if (element !== undefined) {
             str += "<div class='projectcontainer'><img class='dribbbleproject' src=" + element + "></div>";
         }
     });
     if (str != undefined) {
         document.getElementById('dribbble').innerHTML += str;
     }
     init();
 }
 datarequest.send();
 var s = function (sketch) {
     let width;
     let height;
     let pixelD;
     let halfImage;
     let allPixels;
     let colorPalette;

     function readURL(input) {
         if (input.files && input.files[0]) {
             var reader = new FileReader();
             reader.onload = function (e) {
                 img = sketch.loadImage(e.target.result);
             };
             reader.readAsDataURL(input.files[0]);
         }
     }

     sketch.preload = function () {
         img = sketch.loadImage("img/splash.jpg");
     }

     sketch.setup = function () {
         sketch.setCanvasSize();
         sketch.background(0);
         pixelD = sketch.pixelDensity();
         halfImage = 4 * (width * pixelD) * (height * pixelD);
         allPixels = [
             [],
             [],
             [],
             [],
             [],
             [],
             [],
             []
         ];
         colorPalette = [
             [],
             [],
             [],
             [],
             [],
             [],
             [],
             []
         ];
         sketch.noStroke();
         sketch.noLoop();
     }

     sketch.draw = function () {
         sketch.image(img, 0, 0);
         sketch.loadPixels();
         uniformQuantization();
     }

     sketch.setCanvasSize = function () {
         width = img.width;
         height = img.height;
         sketch.createCanvas(width, height + 100);
     }

     function uniformQuantization() {
         for (let i = 0; i < halfImage; i += 4) {
             let r = sketch.pixels[i]
             let g = sketch.pixels[i + 1];
             let b = sketch.pixels[i + 2];
             let block = Math.floor(r / (256 / 8));
             allPixels[block].push([r, g, b]);
         }
         checkAverageBlocks();
         drawColorPalette();
         allHexColors();
     }

     function allHexColors() {
         for (let i = 0; i < colorPalette.length; i++) {
             fullColor(colorPalette[i][0], colorPalette[i][1], colorPalette[i][2]);
            
         }
     }

     function checkAverageBlocks() {
         for (let i = 0; i < allPixels.length; i++) {
             let r = 0;
             let g = 0;
             let b = 0;
             for (let j = 0; j < allPixels[i].length; j++) {
                 r = r + allPixels[i][j][0];
                 g = g + allPixels[i][j][1];
                 b = b + allPixels[i][j][2]
             }
             r = Math.floor(r / allPixels[i].length);
             g = Math.floor(g / allPixels[i].length);
             b = Math.floor(b / allPixels[i].length);
             colorPalette[i].push(r, g, b);
         }
     }

     function drawColorPalette() {
         for (let i = 0; i < colorPalette.length; i++) {
             sketch.fill(colorPalette[i][0], colorPalette[i][1], colorPalette[i][2]);
             sketch.rect(i * width / colorPalette.length, height, width / colorPalette.length, 100);
         }  
     }

     function convertRGBtoHex(rgb) {
         var hex = Number(rgb).toString(16);
         return hex;
     }

     function fullColor(r, g, b) {
         let red = convertRGBtoHex(r);
         let green = convertRGBtoHex(g);
         let blue = convertRGBtoHex(b);
         var fullCol = red + green + blue
         console.log(fullCol);
         getDribbbleProjects(fullCol)
     }

     function getDribbbleProjects(color) {
         //window.location.href = 'https://dribbble.com/colors/' + color;
     }
 }
 //init();