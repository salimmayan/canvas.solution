// // console.log('r.place');
// window.addEventListener("load", () => {
var myCanvas = document.querySelector('#canvas');  //grab a html tag called canvas - here I use ID- our canvas is palced within a variable
myCanvas.width = (window.innerWidth) - 60; //grab window width and return/assign it to Canvas width
myCanvas.height = 400; //0.7 * (window.innerHeight); //grab window height and assign it to canvas height

var context = myCanvas.getContext('2d'); //c is for context.Returning a drawing context to a variable (think of c as OBJECT with lots of variables/fucntions)
let startBackGroundColor = "white";
context.fillStyle = startBackGroundColor;  //default backgroudn color
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

function change_color(element) {
    draw_color = element.style.background;
}
let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishedPosition() {
    painting = false;
    context.beginPath();
}

function draw(e) {
    if (!painting) return;
    context.lineWidth = 10;
    context.lineCap = "round";
    context.strokeStyle = "yellow";
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
}

// myCanvas.addEventListener("touchstart", startPosition);
// myCanvas.addEventListener("touchmove", finishedPosition);
// myCanvas.addEventListener("mousedown", startPosition);
// myCanvas.addEventListener("mouseup", finishedPosition);
// myCanvas.addEventListener("mousemove", draw);
myCanvas.addEventListener("touchstart", start, false);
myCanvas.addEventListener("touchmove", draw, false);
myCanvas.addEventListener("mousedown", start, false);
myCanvas.addEventListener("mousemove", draw, false);

myCanvas.addEventListener("touchend", stop, false);
myCanvas.addEventListener("mouseup", stop, false);
myCanvas.addEventListener("mouseout", stop, false);

function start(e) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(e.clientX - myCanvas.offsetLeft,
        e.clientY - myCanvas.offsetTop);
    e.preventDefault();
}

function draw(e) {
    if (is_drawing) {
        context.lineTo(e.clientX - myCanvas.offsetLeft,
            e.clientY - myCanvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    e.preventDefault();
}

function stop(e) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    e.preventDefault();
}

const btnDownload = document.querySelector("#btnDownload");
const btnClear = document.querySelector("#btnClear");

btnClear.addEventListener("click", function () {  //listen for the click event and run this function
    context.fillStyle = startBackGroundColor;
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);     //feel free to alter- anything less than 900px does not erase the comeplete board
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);  //if I dont do this canvas gets stuck
    // console.log("inside clear");
});

btnDownload.addEventListener("click", function () {
    if (window.navigator.msSaveBlob) {  //IE and Edge (PNG only)//method msSaveBlob is exclusive to these browser makes so in essence u are checking if browswer is IE or edge
        window.navigator.msSaveBlob(msCanvas.msToBlob(), "canvas-image.png") //saving a bloc which would come from msCanvas.msToBlob()
        const dataURI = myCanvas.toDataURL("image/jpeg");     //converting the canvas content into a data URI and basically a data URI is a base64 encoded string representing the actual content of the canvas 
        console.log(dataURI);
    }
    else  //chrome & firefox
    {
        // const a = document.createElement("a");
        // document.body.appendChild(a);
        const dataURI = myCanvas.toDataURL("image/jpeg");     //converting the canvas content into a data URI and basically a data URI is a base64 encoded string representing the actual content of the canvas 
        console.log(dataURI);
        // a.href = myCanvas.toDataURL("image/jpeg", 1); //1 is highest quality image
        // a.download = "canvas-image.jpg";
        // a.click();
        // document.body.removeChild(a);
    }
});

// });