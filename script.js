const SHOW_HIT_REGION = false;
if(!SHOW_HIT_REGION) {
    hitTestCanvas.style.display = "none";
}

const stageProperties = {
    width : 600,
    height: 400,
}
const canvasProperties = {
    width : SHOW_HIT_REGION ? window.innerWidth/2 : window.innerWidth,
    height: window.innerHeight,
    center: {
        x: SHOW_HIT_REGION ? window.innerWidth/4 : window.innerWidth/2,
        y: window.innerHeight/2
    }
}

stageProperties.left = canvasProperties.center.x - stageProperties.width/2;
stageProperties.top = canvasProperties.center.y - stageProperties.height/2;

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;
hitTestCanvas.width = canvasProperties.width;
hitTestCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext("2d");
const hitTestingCtx = hitTestCanvas.getContext("2d");
clearCanvas();

const shapes = [];
let currentShape = null;

myCanvas.addEventListener("pointerdown", downCallbackForPath);
window.addEventListener("keydown", e => {
    if(e.key === "Delete") {
        shapes.splice(shapes.findIndex(s=>s.selected), 1);
        drawShapes(shapes);
    }
});

function changeTool(tool) {
    myCanvas.removeEventListener("pointerdown", downCallbackForRect);
    myCanvas.removeEventListener("pointerdown", downCallbackForPath);
    myCanvas.removeEventListener("pointerdown", downCallbackForSelect);
    switch(tool) {
        case "rect":
        myCanvas.addEventListener("pointerdown", downCallbackForRect);
        break;
        case "path":
        myCanvas.addEventListener("pointerdown", downCallbackForPath);
        break;
        case "select":
        myCanvas.addEventListener("pointerdown", downCallbackForSelect);
        break;
    }
}

function drawShapes(shapes) {
    clearCanvas();
    for(const shape of shapes) {
        shape.draw(ctx);
    };
    hitTestingCtx.clearRect(0, 0, canvasProperties.width, canvasProperties.height);
    for(const shape of shapes) {
        shape.draw(hitTestingCtx, true);
    };
}

function getOptions() {
    return {
        fillColor: fillColor.value,
        strokeColor: strokeColor.value,
        fill: fill.checked,
        stroke: stroke.checked,
        strokeWidth: Number(strokeWidth.value),
        lineCap: "round",
        lineJoin: "round",
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(
        stageProperties.left, 
        stageProperties.top, 
        stageProperties.width, 
        stageProperties.height
    );
    hitTestingCtx.fillStyle = "red"
    hitTestingCtx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);
}

function changeFillColor(value) {
    shapes.filter(s=>s.selected).forEach(s=>s.options.fillColor=value);
    drawShapes(shapes);
}
function changeFill(value) {
    shapes.filter(s=>s.selected).forEach(s=>s.options.fill=value);
    drawShapes(shapes);
}
function changeStrokeColor(value) {
    shapes.filter(s=>s.selected).forEach(s=>s.options.strokeColor=value);
    drawShapes(shapes);
}
function changeStroke(value) {
    shapes.filter(s=>s.selected).forEach(s=>s.options.stroke=value);
    drawShapes(shapes);
}
function changeStrokeWidth(value) {
    shapes.filter(s=>s.selected).forEach(s=>s.options.strokeWidth=Number(value));
    drawShapes(shapes);
}
