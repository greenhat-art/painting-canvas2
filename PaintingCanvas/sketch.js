

var canvas;
var database;
var isDrawing = false;
var currentPath = [];
var drawing = [];
var dB_drawing = [];

function setup() {
    canvas = createCanvas(1200, 800);
    //    background("yellow")
    canvas.parent("canvascontainer");
    database = firebase.database();

    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    var saveButton = select('#saveButton');
    //saveButton.size(59, 50);
    //saveButton.position(330,50);
   // saveButton.mousePressed(saveDrawing);
    var clearButton = select('#clearButton');
    clearButton.position(1130,29)
    clearButton.size(50, 30);
    clearButton.mousePressed(clearDrawing);

}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
    //dBref.push(drawing);
}

function draw() {
    background("black");
    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY
        };
        currentPath.push(point);
    }
    stroke(rgb(244, 22, 22));
    strokeWeight(rgb(244, 22, 22));
    noFill();
    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
        
    }

    //Reading from database
    // readData();
    // stroke(255, 0, 0);
    // strokeWeight(4);
    // noFill();

    // for (var i = 0; i < dB_drawing.length; i++) {
    //     var path = dB_drawing[i];
    //     beginShape();
    //     for (var j = 0; j < path.length; j++) {
    //         vertex(path[j].x, path[j].y);
    //     }
    //     endShape();
    // }
}


function readData() {
    database.ref('Clear/Session1/drawing/').on('child_added', function(data) {
        dB_drawing.push(data.val());
        console.log(dB_drawing);
    })
}

function saveDrawing() {
    var dBref = database.ref('Clear');
    var data = {
        name: 'JSH',
        drawing: drawing,
        //    color: [120, 18, 234],

    };
    //dBref.push(data);
    dBref.set({
        "Session1": data
    })
}

//clear all data in database
function clearDrawing() {
    dB_drawing = [];
    var dBref = database.ref('Clear');
    dBref.remove();
}