const LEVEL_SELECT_ELEMENT = document.getElementById("level-select");
const START_BUTTON_ELEMENT = document.getElementById("start-button");
const GAME_BOARD_CONTAINER_ELEMENT = document.getElementById(
  "game-board-container"
);
const GAME_BOARD_ELEMENT = document.getElementById("game-board");
const GAME_TIMER_ELEMENT = document.getElementById("game-timer");
const CURRENT_SCORE_ELEMENT = document.getElementById("current-score");
const HIGHEST_SCORE_ELEMENT = document.getElementById("highest-score");

const INITIAL_GAME_TIME = 120;
const HIGHEST_SCORE_LOCAL_STORAGE_KEY = "highestScore";

let countDownInterval,
  gameInterval,
  boardSize,
  currentScore = 0;

let highestScore =
  parseInt(localStorage.getItem(HIGHEST_SCORE_LOCAL_STORAGE_KEY), 10) || 0;
HIGHEST_SCORE_ELEMENT.textContent = highestScore;

LEVEL_SELECT_ELEMENT.onchange = levelChange;
START_BUTTON_ELEMENT.onclick = startGame;
GAME_TIMER_ELEMENT.textContent = INITIAL_GAME_TIME;

function levelChange(ev) {
  const level = ev.target.value;
  if (level) {
    boardSize = level;
    START_BUTTON_ELEMENT.disabled = false;
    LEVEL_SELECT_ELEMENT.disabled = true;
  }
}

function startGame() {
  currentScore = 0;
  GAME_TIMER_ELEMENT.textContent = INITIAL_GAME_TIME;
  START_BUTTON_ELEMENT.textContent = "Restart";
  GAME_BOARD_CONTAINER_ELEMENT.classList.remove("d-none");
  START_BUTTON_ELEMENT.onclick = reset;
  if (countDownInterval) {
    clearInterval(countDownInterval);
  }
  GAME_BOARD_ELEMENT.innerHTML = "";

  makeTable();

  startTimer();
}

function makeTable() {
  for (let index = 0; index < boardSize; index++) {
    const TR = document.createElement("tr");
    for (let index = 0; index < boardSize; index++) {
      const TD = document.createElement("td");
      TD.onclick = changeScore;
      TR.appendChild(TD);
    }
    GAME_BOARD_ELEMENT.appendChild(TR);
  }
}

function changeScore(ev) {
  const isHighlighted = ev.target.classList.contains("highlight");
  currentScore = currentScore + (isHighlighted ? 1 : -1);
  CURRENT_SCORE_ELEMENT.textContent = currentScore;
}

function startTimer() {
  let gameTime = INITIAL_GAME_TIME;

  let prevRowRandomNumber,
    nextRowRandomNumber,
    prevColRandomNumber,
    nextColRandomNumber;

  highlightTable();

  countDownInterval = setInterval(() => {
    gameTime -= 1;
    highlightTable();

    if (gameTime === 0) {
      gameOver();
    }
  }, 1000);

  function highlightTable() {
    GAME_TIMER_ELEMENT.textContent = gameTime;

    if (prevRowRandomNumber > -1 && prevColRandomNumber > -1) {
      removeHighlight(prevRowRandomNumber, prevColRandomNumber);
    }

    nextRowRandomNumber = getRandomInt(0, 2, prevRowRandomNumber);
    nextColRandomNumber = getRandomInt(0, 2, prevColRandomNumber);

    addHighlight(nextRowRandomNumber, nextColRandomNumber);

    prevRowRandomNumber = nextRowRandomNumber;
    prevColRandomNumber = nextColRandomNumber;
  }
}

function addHighlight(rowNumber, colNumber) {
  const row = GAME_BOARD_ELEMENT.childNodes.item(rowNumber);
  const col = row.childNodes.item(colNumber);
  col.classList.add("highlight");
}

function removeHighlight(rowNumber, colNumber) {
  const row = GAME_BOARD_ELEMENT.childNodes.item(rowNumber);
  const col = row.childNodes.item(colNumber);
  col.classList.remove("highlight");
}

function gameOver() {
  // if the ok button is clicked, result will be true (boolean)
  clearInterval(countDownInterval);
  updateHighScore();
  setTimeout(() => {
    var result = confirm("Game over!! Restart the game?");
    if (result) {
      // the user clicked ok
      reset();
    } else {
      // the user clicked cancel or closed the confirm dialog.
    }
  });
}

function reset() {
  boardSize = undefined;
  START_BUTTON_ELEMENT.disabled = true;
  START_BUTTON_ELEMENT.textContent = "Start";
  LEVEL_SELECT_ELEMENT.value = "";
  LEVEL_SELECT_ELEMENT.disabled = false;
  GAME_BOARD_CONTAINER_ELEMENT.classList.add("d-none");
  GAME_TIMER_ELEMENT.textContent = INITIAL_GAME_TIME;
  START_BUTTON_ELEMENT.onclick = startGame;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @see https://stackoverflow.com/a/1527820/3339907
 */
function getRandomInt(min, max, matchNumber) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const final = Math.floor(Math.random() * (max - min + 1)) + min;
  if (final === matchNumber) {
    return getRandomInt(min, max, matchNumber);
  }
  return final;
}

function updateHighScore() {
  if (currentScore > highestScore) {
    highestScore = currentScore;
    HIGHEST_SCORE_ELEMENT.textContent = highestScore;
    localStorage.setItem(HIGHEST_SCORE_LOCAL_STORAGE_KEY, highestScore);
  }
}
