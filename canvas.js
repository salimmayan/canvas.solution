// console.log('r.place');
window.addEventListener("load", () => {
    var myCanvas = document.querySelector('#canvas');  //grab a html tag called canvas - here I use ID- our canvas is palced within a variable
    myCanvas.width = 0.7 * (window.innerWidth); //grab window width and return/assign it to Canvas width
    myCanvas.height = 0.7 * (window.innerHeight); //grab window height and assign it to canvas height

    var c = myCanvas.getContext('2d'); //c is for context.Returning a drawing context to a variable (think of c as OBJECT with lots of variables/fucntions)
    // c.fillStyle = "red";
    // c.fillRect(100, 100, 100, 100); //(so "c.fillRect" means call static function fillRect from OBJECT "c")
    // c.fillStyle = "orange";
    // c.fillRect(400, 100, 100, 100); //c.fillRect(x, y, width, height);
    // c.fillStyle = "red";
    // c.fillRect(300, 300, 100, 100);
    // console.log(myCanvas);
    // //Line
    // c.beginPath();
    // c.moveTo(50, 300);
    // c.lineTo(300, 100);
    // c.lineTo(400, 400);
    // c.strokeStyle = "blue"; //give sytlying color to line - similar to one used for rectangle - c.fillStyle="red";
    // c.stroke();
    //variables
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        c.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        c.lineWidth = 10;
        c.lineCap = "round";
        c.strokeStyle = "yellow";
        c.lineTo(e.clientX, e.clientY);
        c.stroke();
        c.beginPath();
        c.moveTo(e.clientX, e.clientY);
    }


    myCanvas.addEventListener("mousedown", startPosition);
    myCanvas.addEventListener("mouseup", finishedPosition);
    myCanvas.addEventListener("mousemove", draw);
    // const btnDisplay = document.querySelector("#btnDisplay");
    const btnDownload = document.querySelector("#btnDownload");
    // const imgConverted = document.querySelector("#imgConverted");
    const btnClear = document.querySelector("#btnClear");

    // btnDisplay.addEventListener("click", function () {  //listen for the click event and run this function
    //     const dataURI = myCanvas.toDataURL("image/jpeg");     //converting the canvas content into a data URI and basically a data URI is a base64 encoded string representing the actual content of the canvas 
    //     console.log(dataURI);
    //     imgConverted.src = dataURI;
    // });

    btnClear.addEventListener("click", function () {  //listen for the click event and run this function
        c.clearRect(0,0,900,900);     //feel free to alter frmom 900 - anything less than 900 does not erase the comeplete board
        console.log("inside clear");
        // imgConverted.src = dataURI;
    });

    btnDownload.addEventListener("click", function () {         
        if(window.navigator.msSaveBlob) {  //IE and Edge (PNG only)//method msSaveBlob is exclusive to these browser makes so in essence u are checking if browswer is IE or edge
            window.navigator.msSaveBlob(msCanvas.msToBlob(), "canvas-image.png") //saving a bloc which would come from msCanvas.msToBlob()
        }
        else  //chrome & firefox
        {
            const a =  document.createElement("a");
            document.body.appendChild(a);
            a.href = myCanvas.toDataURL("image/jpeg", 1); //1 is highest quality image
            a.download = "canvas-image.jpg";
            a.click();
            document.body.removeChild(a);
        }
    });

});

// var dataURL = canvas.toDataURL();  //Convert canvas image to URL format (base64)


// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#5555555',
    text: "palette",

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            // clear: true,
            // save: true
        }
    }
});

pickr.on('change', (color, instance) => {
    const rgbaColor = color.toRGBA().toString();
    console.log(rgbaColor);
    document.querySelector('#canvas').style.background = rgbaColor;
})
