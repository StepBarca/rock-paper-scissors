let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement()

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() { // переносит id интервала в переменную
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId); // останавливает интервал с заданным id
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove()

  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose!';
    } else if (computerMove === 'scissors') {
      result = 'You win!'
    }
  }

  if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose!';
    } else if (computerMove === 'rock') {
      result = 'You win!'
    }
  }

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose!';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose!') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement()

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML 
  = `You
    <img class="move-icon" src="${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="${computerMove}-emoji.png" alt="">
    Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score')
  updateScoreElement()
}