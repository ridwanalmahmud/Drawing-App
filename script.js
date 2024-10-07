const myCanvas = document.querySelector("#myCanvas");

const canvasProperties = {
    width : window.innerWidth,
    height: window.innerHeight,
    center: {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    }
}

const stageProperties = {
    width : 600,
    height: 400,
    left  : canvasProperties.center.x - 600/2,
    top   : canvasProperties.center.y - 480/2
}

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext("2d");
clearCanvas();

const shapes = [];
let path = [];

myCanvas.addEventListener("pointerdown", e => {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };

    path.push(mousePosition);

    const moveCallback = (e) => {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };

        path.push(mousePosition);
        clearCanvas();
        for(const shape of [...shapes, path]) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.lineWidth = 5;
            ctx.moveTo(shape[0].x, shape[0].y);
            for(let i = 1; i < shape.length; i++) {
                ctx.lineTo(shape[i].x, shape[i].y);
            };
            ctx.stroke();
        };
    };

    const upCallback = (e) => {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);
        shapes.push(path);
        path = [];

    };

    myCanvas.addEventListener("pointermove", moveCallback);
    myCanvas.addEventListener("pointerup", upCallback);
});

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
}
