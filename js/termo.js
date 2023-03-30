document.addEventListener("DOMContentLoaded", function() {
    const url = new URLSearchParams(window.location.search);
    const numr = url.get("numr")
    const cham = url.get("cham")
    const motv = url.get("motv")
    const nome = url.get("nome")
})

function signPen() {
    var scrl = window.scrollY
    if (scrl >= 1600) { window.scrollTo({ top: 1400, behavior: "smooth"}) } 
}

var canvas = document.getElementById("sign"); var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000";
ctx.lineWith = 1;
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;

canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseup", function (e) {
    drawing = false;
}, false);

canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
}, false);

function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || 
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

function renderCanvas() {
    if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
    }
}
  
(function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
})();

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
});
    canvas.dispatchEvent(mouseEvent);
}, false);

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}