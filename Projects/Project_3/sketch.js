PrimaryDark="#311915"
PrimaryMid="#B06649"
PrimaryLight="#E9C4B1"
SecondaryDark="#124E78"
SecondaryLight="#D2FDFF"


function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();

  //draw left filters
  rectMode(CORNER);
  fill(SecondaryLight);
  rect(0, 0, 200, height);

  // Draw the top menu bar
  rectMode(CENTER);
  fill(SecondaryDark);
  rect(width / 2, 50, width, 100);


}
