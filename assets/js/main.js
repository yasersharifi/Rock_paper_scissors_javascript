setUserName();
let userChoose = null;
let pcChoose = null;
let scores = 0;
let bestRecords = 0;
let counter = 0;
let winAudio = new Audio('assets/audio/winAudio.mp3');
let gameOverAudio = new Audio('assets/audio/gameOver.mp3');

function generateHand() {
    let randomNumber = Math.floor(Math.random() * 3);
    let handType = ["rock", "paper", "scissors"];

    return handType[randomNumber];
}

function check(input) {
    pcChoose = generateHand();
    userChoose = input;
    let isWin = false;

    // change hand image
    document.getElementById("pcHand").src = "assets/img/" + pcChoose + ".png";

    if (pcChoose === userChoose) {
        changeBackground("#ffc107");
        addWinClass("pcHand");
        document.getElementsByClassName(userChoose)[0].classList.add("winClass");
        return;
    }
    else if (userChoose === "paper" && pcChoose === "rock")
        isWin = true;
    else if (userChoose === "rock" && pcChoose === "scissors")
        isWin = true;
    else if (userChoose === "scissors" && pcChoose === "paper")
        isWin = true;

    if (isWin) {
        goNextLevel(input);
    } else {
        endGame();
    }
}

function goNextLevel(winClass) {
    scores ++;
    changeScores(scores);
    changeBackground("#4cae4c");
    addWinClass(winClass);
    winAudio.play();
}

function endGame() {
    counter ++;
    gameCounter();
    if (scores > bestRecords) {
        bestRecords = scores;
        highRecords();
    }
    scores = 0;
    changeScores(scores);
    changeBackground("#ff0000");
    addWinClass("pcHand");
    gameOverAudio.play();
}

function changeScores(score) {
    let scoreElem = document.getElementsByClassName("score")[0];
    scoreElem.textContent = `امتیاز شما: ${score}`;
}

function addWinClass(addClass) {
    document.getElementById("pcHand").classList.remove("winClass");
    document.getElementsByClassName("paper")[0].classList.remove("winClass");
    document.getElementsByClassName("rock")[0].classList.remove("winClass");
    document.getElementsByClassName("scissors")[0].classList.remove("winClass");
    document.getElementsByClassName(addClass)[0].classList.add("winClass");
}

function changeBackground(color) {
    document.getElementsByClassName("mainArea")[0].style.backgroundColor = color;
}

function highRecords() {
    let bestRecordsElem = document.getElementById("bestRecords");
    bestRecordsElem.innerText = bestRecords;
}

function gameCounter() {
    let gameCountElem = document.getElementById("gameCount");
    gameCountElem.innerText = counter.toString();
}

function setUserName() {
    let userName = prompt("لطفا نام خود را وارد نمایید: (مثلا: یاسر)");
    let userBadgeElem = document.getElementsByClassName("userBadge")[0];
    userBadgeElem.textContent = userName;
}
