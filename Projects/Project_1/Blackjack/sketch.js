let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let hand = []; //array to keep track of hand
let begin, stay, hit, newRound, resetGame;
let start = 450; //starting position of cards drawn
//card variables
let deckBack;
let deckFront;
//score variables
let roundScore = 0;
let highScore = 0;
//audio variables
let place;
let win;
let loss;
let blackjack;
let shuffleCard;
let music;
//audio setting variables
let musicSlider;
let effectSlider;
let musicAmp;
let effectAmp;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30, 105, 37);
  textAlign(CENTER);

  //sound effects from Pixabay
  place = await createAudio("oxidvideos-placing.mp3");
  shuffleCard = await createAudio("oxidvideos-shuffling.mp3");
  win = await createAudio("win.mp3");
  loss = await createAudio("loss.mp3");
  blackjack = await createAudio("BLACKJACK.mp3")
  music = await createAudio("casinoMusic.mp3")

  audioSettingsSetup();
  musicSlider.hide();
  effectSlider.hide();
  
  deckBack = await loadImage("Deck_Back.png");
  deckFront = await loadImage("Blank_Card.png");

  //button setup
  begin = createButton("Begin");
  begin.position(width / 2 - 25, height / 2 + 200);

  stay = createButton("Stay");
  stay.position(width / 2 - 100, height / 2 + 150);
  stay.hide();

  hit = createButton("Hit");
  hit.position(width / 2 + 100, height / 2 + 150);
  hit.hide();

  newRound = createButton("New Round");
  newRound.position(width / 2 - 50, height / 2 + 200);
  newRound.hide();

  resetGame = createButton("New Game");
  resetGame.position(width / 2 - 50, height / 2 + 200);
  resetGame.hide();

  startScreen();
}

function draw() {
  //buttons - have to be in a loop, no loop will kill the scores
  rectMode(CORNER);

  //button functions
  stay.mousePressed(checkWin);
  hit.mousePressed(showCard);
  newRound.mousePressed(newGame);
  begin.mousePressed(gameSetup);
  resetGame.mousePressed(reset);

  let musicvVol = musicSlider.value();
  let effectVol = effectSlider.value();
  music.volume(musicSlider.value());
  place.volume(effectSlider.value());
  win.volume(effectSlider.value());
  loss.volume(effectSlider.value());
  blackjack.volume(effectSlider.value());
  shuffleCard.volume(effectSlider.value());

  //later add some feedback graphic when win/lose
}

//this function creates the card value & displays card graphic
function drawCard(cardX) {
  //first we draw a card

  //draw card
  imageMode(CENTER);
  image(deckFront, cardX, 325); //card
  //grab a value from deck
  let cardValue = random(deck);
  //moves card start position to the right
  start = start + 100;
  //return the card value
  return cardValue;
}

//calls drawCard() function when "hit" button+ displays a card and adds shown card to hand
function showCard() {
  //when the "hit" btn is pressed, we call the drawCard() function to generate the card.
  //showCard() function is to take that value returned from the drawCard() function and we display it on screen with the text() function
  let drawnCard = drawCard(start); //calls drawCard()
  //card text
  fill(0);
  textSize(30);
  //converts number to array
  text(`${drawnCard}`, start - 100, 325);
  //push the drawn card to the hand array
  hand.push(drawnCard);
  currentHand();
  place.play();

  //run some checks in console to test/debug
  //console.log(hand);
  //console.log(countHand()); //we can use this function to setup the win/lose check
}

//this function counts the cards in hand
function countHand() {
  let handTotal = 0;
  for (let i = 0; i < hand.length; i++) {
    handTotal = handTotal + hand[i];
  }
  //return again is returning this value when the function is called
  return handTotal;
}

//Checks for Win condition this round
function checkWin() {
  let handTotal = 0;
  for (let i = 0; i < hand.length; i++) {
    handTotal = handTotal + hand[i];
  }
  if (handTotal < 21) {
    textSize(20);
    text("Win", width / 2, 200);
    roundScore = roundScore + handTotal;
    totalScore();
    hiScore();
    win.play();

    stay.hide();
    hit.hide();
    newRound.show();
  } else if (handTotal > 21) {
    fill(171, 27, 17);
    textSize(50);
    text("GAME OVER", width / 2, 200);
    fill(0);
    roundScore = 0;
    totalScore();
    loss.play();

    stay.hide();
    hit.hide();
    resetGame.show();
  } else if (handTotal = 21) {
    textSize(20);
    text("BLACKJACK!", width / 2, 200);
    roundScore = roundScore + handTotal*2;
    totalScore();
    hiScore();
    blackjack.play();

    stay.hide();
    hit.hide();
    newRound.show();
  }
  return handTotal;
}

//Displays currant hand value
function currentHand() {
  //current hand score
  noStroke();
  fill(30, 105, 37);
  rect(width - 300, 450, 200, 75); //this is here so the numbers dont stack
  fill(0);
  textSize(30);
  text("Current Hand", width - 200, 475);
  textSize(20);
  text(`${countHand()}`, width - 200, 525);
}

//Total Score
function totalScore() {
  noStroke();
  fill(30, 105, 37);
  rect(100, 450, 200, 75); //this is here so the numbers dont stack
  fill(0);
  textSize(30);
  text("Total Score", 200, 475);
  textSize(20);
  text(`${roundScore}`, 200, 525);
}

function hiScore() {
  if (highScore < roundScore) {
    highScore = roundScore;
  }
  noStroke();
  fill(30, 105, 37);
  rect(100, 125, 200, 75); //this is here so the numbers dont stack
  fill(0);
  textSize(30);
  text("High Score", 200, 150);
  textSize(20);
  text(`${highScore}`, 200, 200);
}

//Reset Game for new round
function newGame() {
  background(30, 105, 37);
  deckStack(200, 325);
  currentHand();
  totalScore();
  hiScore();
  start = 450;
  hand = [];
  currentHand();
  shuffleCard.play();

  newRound.hide();
  stay.show();
  hit.show();
}

//Restart Game
function reset() {
  newGame();
  totalScore();
  hiScore();

  resetGame.hide();
  stay.show();
  hit.show();
}

function gameSetup() {
  background(30, 105, 37);
  deckStack(200, 325);
  textSize(15)
  text("Stay - keep your hand and count your points. Hit - pull another card. Blackjack scores Double.", width/2,height - 150)
  currentHand();
  totalScore();
  hiScore();
  showAudio();

  begin.hide();
  stay.show();
  hit.show();
  loop();
}

//Starting screen
function startScreen() {
  fill(0);
  textSize(40);
  text("Blackjack", width / 2, 150);
  textSize(20)
  text("Don't break 21.", width/2, 200)
  //draw the stack of cards
  deckStack(width / 2, height / 2);
}

function audioSettingsSetup(){
  musicSlider = createSlider(0, 1, 0.5, 0.01);
  musicSlider.position(width/3, 10);
  musicAmp = new p5.Amplitude();
  effectSlider = createSlider(0, 1, 0.5, 0.01);
  effectSlider.position(width/3*2, 10);
  effectAmp = new p5.Amplitude();
}

function showAudio(){
  fill(0);
  textSize(15);
  text("Music", width/3-25, 25);
  text("Sound Effects", width/3*2-50, 25);
  musicSlider.show();
  effectSlider.show();
}

//this function just displays the deck graphic
function deckStack(stackX, stackY) {
  //card
  imageMode(CENTER);
  image(deckBack, stackX, stackY);
}
