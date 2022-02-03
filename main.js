var status = ""
var objects = []

function preload(){

}

function setup(){

 canvas = createCanvas(380,380)
 canvas.center();

 webcam = createCapture(VIDEO);
 webcam.hide();

 objectDetector = ml5.objectDetector('cocossd',modelLoaded)

 document.getElementById('status').innerHTML = 'Status : Detecting objects'
}


function draw(){

    image(webcam,0,0,380,380)

    if(status != ""){

    objectDetector.detect(webcam,gotResults)

    r = random(255)
    g = random(255);
    b = random(255)

    for(i=0;i < objects.length; i++){

        document.getElementById('status').innerHTML = 'Status: objects detected'
        document.getElementById('numberObjects').innerHTML = 'Number of objects : '+objects.length

        fill(r,g,b)

        percentage = floor(objects[i].confidence * 100)

        text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 10);

        noFill()
        stroke(r,g,b)
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

        
    }

    }
}


function modelLoaded(){
    console.log("Model Loaded!")
    status = true

    
}

function gotResults(error,results){

    if(error){
        console.log(error)
    }
    else{
        console.log(results)

        objects = results;

        
    }

}