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

  //homepage();
  OrgPage();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function homepage() {
  FilterBar();
  NavBar();

  //placeholder for buttons
  push();
  rectMode(CENTER);
  for (let i = 0; i < 8; i++) {
    fill(PrimaryLight);
    rect(350 + i * 150, 150, 125, 40, 20);
  }
  pop();

}
function OrgPage() {
  FilterBar();
  NavBar();

  //placeholder for items
  push();
  rectMode(CENTER);

  for (let i = 0; i < 8; i++) {
    fill(PrimaryLight);
    rect(350 + i * 150, 150, 125, 40, 5);
  }


  pop();
}

function NavBar() {
  // Draw the top menu bar
  rectMode(CENTER);
  fill(SecondaryDark);
  rect(width / 2, 50, width, 100);
}

function FilterBar() {
      //draw left filters
  rectMode(CORNER);
  fill(SecondaryLight);
  rect(0, 0, 250, height);

  //placeholder for filters
  push();
  for (let i = 0; i < 12; i++) {
    rectMode(CENTER);
    fill(SecondaryDark);
    rect(125, 150 + i * 75, 200, 50, 5);
  }
  pop();

}
