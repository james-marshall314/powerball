
//PowerBall logic
var pickPrice = 2.00;
var winningNumbers = [];
var tickets = [];
var winnings = 0;
var jackpot = 1500000000
var winners = [];

function setBalls(numberOfBalls) {
  var ballsArray = [];
  for (var i = 0; i < numberOfBalls; i++) {
    ballsArray.push(i+1); 
  }
  return ballsArray;
}

function pickNumbers() {
  var balls = setBalls(69);
  var powerBalls = setBalls(26);
  var picks = [];
  
  for (var i = 0; i < 5; i++) {
    var pick = Math.floor(Math.random() * balls.length);
    picks.push(balls.splice(pick, 1)[0]);
    picks.sort(function(a, b){return a-b});
  }
  picks.push(Math.floor(Math.random() * powerBalls.length));
  return picks;
}

function buyTickets(numberOfTickets) {
  console.log("Buying ",numberOfTickets," tickets...");
  tickets = [];
  for (var i = 0; i < numberOfTickets; i++) {
    tickets.push(pickNumbers());
  }
}

function drawWinner() {
  winningNumbers = pickNumbers();

}

function checkTicket(ticket) {
  var matches = 0;
  var powerBall = false;
  var winner = false;
  var winnings = 0;
  for (var i = 0; i < 5; i++) {
    if (ticket[i] === winningNumbers[i]) {
      matches++;
    }
  }
  if (ticket[5] === winningNumbers[5]) {
    powerBall = true;
  }
  if (matches > 2 || powerBall !== false){
    winner = true;
    winnings = getWinnings(matches, powerBall);
  }
  return {
    matches: matches,
    powerBall: powerBall,
    winner: winner,
    winnings: winnings,
  };
}

function getWinnings(matches, powerBall) {
  if (powerBall) {
    switch (matches) {
      case 0: return 4;
      case 1: return 4;
      case 2: return 7;
      case 3: return 100;
      case 4: return 50000;
      case 5: return jackpot;
    }
  }
  else {
    switch (matches) {
      case 3: return 7;
      case 4: return 100;
      case 5: return 1000000;
    }
  }
}

function totalWinnings() {
  console.log("Checking for winners...");
  for (var i = 0; i < tickets.length; i++) {
    ticket = tickets[i];
    results = checkTicket(ticket);
    if (results.winner) {
      winners.push(results);
      //console.log(results);
      winnings += results.winnings;
      //console.log(winnings);
    }
  }
}

function reset() {
  winningNumbers = [];
  tickets = [];
  winnings = 0;
  jackpot = 1500000000;
  winners = [];
}

// winningNumbers = [7, 9, 49, 52, 62, 17];

// tickets.push([7, 9, 49, 52, 62, 17]);
// tickets.push([7, 9, 49, 52, 62, 3]);
// tickets.push([7, 9, 49, 52, 61, 3]);

// totalWinnings();

// console.log(winningNumbers);
// console.log(winners.length);
// console.log(winnings);
function play(numberOfTickets) {
  reset();
  buyTickets(numberOfTickets);
  var cashSpent = tickets.length * 2;
  drawWinner();
  setDomBalls();
  totalWinnings();
  console.log(winningNumbers);
  console.log(winners.length);
  console.log('You spent $' + cashSpent + ' and won $' + winnings + ".");
}


//UI jquery
$(":button").click(function(){
    $("h1").text($("#tickets").val());
    console.log("hi");
});

function setDomBalls() {
  for (var i = 0; i < 6; i ++) {
    $("#winning-numbers li").eq(i).text(winningNumbers[i]);
    console.log('butt');
  }
}



































