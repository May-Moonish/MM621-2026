let answerResults = ["no", "yes", "maybe"];
let answer = 8;

function setup() {
 let canvas = createCanvas(500, 600);
  canvas.parent('project_1')
   background(100,0,100);
}

function draw() {

  //Ball Construction
  ellipseMode(CENTER);
  fill(0);
  ellipse(width / 2, height / 3, 350);
  fill(200, 200, 255, 50);
  ellipse(width / 2, height / 3, 250, 200);
  textAlign(CENTER);
  fill(255);
  //Bal answers
  //text("8", width / 2, height / 2.75);
  textSize(72);
  text(answer, width / 2, height / 2.75);

  //directions
  textSize(18)
  text("Press keys to get your fortune!", width / 2, 430);

  //button
  rectMode(CENTER);

  if (
    mouseX >= width / 3 &&
    mouseX <= (width / 3) * 2 &&
    mouseY > 450 &&
    mouseY < 550
  ) {
    fill(100);
  } else {
    fill(255);
  }
  rect(width / 2, 500, width / 3, 100);
  fill(0);
  textSize(32);
  text("Reset", width / 2, 510);
  
}

//Ball results
function keyPressed() {
  answer = random(answerResults);
}

//reset ball
function mousePressed() {
  if (
    mouseX >= width / 3 &&
    mouseX <= (width / 3) * 2 &&
    mouseY > 450 &&
    mouseY < 550
  ) {
    answer = 8;
  }
}
