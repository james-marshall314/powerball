
//PowerBall logic
var ticketPrice = 2.00;
var winningNumbers = [];
var tickets = [];
var winnings = 0;
var jackpot = 1500000000
var winners = [];

//lifetime totals
var ticketsPlayed = 0;
var winningTickets = 0;
var totalSpent = 0;
var totalWon = 0;
var netWorth = 0;

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
    ticketsPlayed++;
    if (results.winner) {
      winners.push(results);
      //console.log(results);
      winnings += results.winnings;
      //console.log(winnings);
      winningTickets++;
    }
  }
}

function setTotals() {
  totalSpent = ticketsPlayed * ticketPrice;
  totalWon += winnings;
  netWorth = totalWon - totalSpent;
}

function reset() {
  winningNumbers = [];
  tickets = [];
  winnings = 0;
  jackpot = 1500000000;
  winners = [];
}

function play(numberOfTickets) {
  cashSpent = numberOfTickets * ticketPrice;
  reset();
  if (numberOfTickets > 100000) {
    badInput();
  }
  else {
    buyTickets(numberOfTickets);
    drawWinner();
    setDomBalls();
    totalWinnings();
    setTotals();
    $(".card-block h1").text('You spent $' + cashSpent.toLocaleString() + ' and won $' + winnings.toLocaleString() + ".");
    $("#tickets-played").text(ticketsPlayed);
    $("#winning-tickets").text(winningTickets);
    $("#money-spent").text(totalSpent.toLocaleString());
    $("#money-won").text(totalWon.toLocaleString());
    $("#net-worth").text(netWorth.toLocaleString());
  }
}

function badInput() {
  //$(".card-block h1").text(' $' + cashSpent + ' and won $' + winnings + ".");
  //$(".form-control").attr("placeholder", "Fuck that, i'll front you on 100,000 max!");
  alert("No way you have $" + cashSpent.toLocaleString() + " to drop on tickets. Try again big shot (max buy = 100,000)");
}


//UI jquery
$("#play").click(function(){
    //$("h1").text($("#tickets").val());
    play($(".form-control").val());
    $(".form-control").val(null);
    console.log("hi");
});

$("#reset").click(function(){
    //$("h1").text($("#tickets").val());
    ticketsPlayed = 0;
    winningTickets = 0;
    totalSpent = 0;
    totalWon = 0;
    netWorth = 0;
    reset();
    $(".card-block h1").text("Let's Fucking Gamble!");
    $("#tickets-played").text(ticketsPlayed);
    $("#winning-tickets").text(winningTickets);
    $("#money-spent").text(totalSpent.toLocaleString());
    $("#money-won").text(totalWon.toLocaleString());
    $("#net-worth").text(netWorth.toLocaleString());
    console.log("hi");
});

function setDomBalls() {
  for (var i = 0; i < 6; i ++) {
    $("#winning-numbers li").eq(i).text(winningNumbers[i]);
    console.log('butt');
  }
}



































