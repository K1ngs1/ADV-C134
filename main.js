var img = "";
status = "";
objects = [];
alarm = "";

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectdetecter = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;

    objectdetecter.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    alarm = loadSound("alarm.mp3");
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (var i = 0; i < objects.length; i++) {
            if (object[i].label == "person") {
                document.getElementById("status").innerHTML = "Baby detected";
                alarm.pause();
            } else {
                document.getElementById("status").innerHTML =
                    "Baby not detected";
                alarm.play();
            }
        }
    }
}
