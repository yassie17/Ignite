const choices = [{ name: "rock", wins: [3, 2] }, { name: "paper", wins: [0, 4] }, { name: "scissors", wins: [1, 3] }, { name: "lizard", wins: [4, 1] }, { name: "spock", wins: [0, 2] }];
const overlay = document.querySelector(".rules-overlay");
const myChoiceSpan = document.querySelector("#my-choice span");
const houseChoiceSpan = document.querySelector("#house-choice span");
const scoreValue = document.getElementById("score");
const playingContainer = document.querySelector(".playing-container");
const subContainer = document.querySelector(".subContainer");
const playAgainBtn = document.querySelector("#playAgainBtn");
const resultDiv = document.getElementById("resultMsg");
let myChoiceIndex;
let houseChoiceIndex;
let score = 0;

document.querySelectorAll(".subContainer button").forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id) {
            myChoiceIndex = choices.findIndex(x => x.name === e.target.id);
        }
        else {
            myChoiceIndex = choices.findIndex(x => x.name === e.target.parentElement.id);

        }
        houseChoiceIndex = random();
        console.log(e.target);
        console.log(myChoiceIndex);
        console.log(houseChoiceIndex);
        displayChoices();
        setTimeout(getResult, 1500);
        playingContainer.classList.remove("display--none");
        subContainer.classList.add("display--none");
    });
});

playAgainBtn.addEventListener("click", () => {
    playingContainer.classList.add("display--none");
    subContainer.classList.remove("display--none");
    resetWinner();
});

function random() {
    let random = Math.floor(Math.random() * 5);
    return random;
}

function getResult() {
    if (myChoiceIndex === houseChoiceIndex) {
        resultDiv.innerText = "IT'S A TIE";
        return "tie";
    }

    else if (choices[myChoiceIndex].wins.includes(houseChoiceIndex)) {
        score++;
        console.log(score);
        myChoiceSpan.classList.add("span--winner");
        resultDiv.innerText = "YOU WIN!";
    }

    else {
        score = 0;
        houseChoiceSpan.classList.add("span--winner");
        resultDiv.innerText = "YOU LOSE";

    }
    scoreValue.innerText = score;
}

document.querySelector(".rule").addEventListener("click", function () {
    overlay.classList.toggle("display--none");
});

function displayChoices() {
    let myChoiceName = choices[myChoiceIndex].name;
    let houseChoiceName = choices[houseChoiceIndex].name;
    myChoiceSpan.id = myChoiceName;
    myChoiceSpan.style.boxShadow = "none";
    document.getElementById("myPickImage").src = `images/icon-${myChoiceName}.svg`;
    setTimeout(() => {
        houseChoiceSpan.id = houseChoiceName;
        houseChoiceSpan.style.boxShadow = "none";
        houseChoiceSpan.classList.remove("span--inactive");
        document.getElementById("housePickImage").src = `images/icon-${houseChoiceName}.svg`;
    }, 1000);
}

function resetWinner() {
    myChoiceSpan.classList.remove("span--winner");
    houseChoiceSpan.classList.remove("span--winner");
    document.getElementById("housePickImage").src = ``;
    houseChoiceSpan.id = "";
    houseChoiceSpan.classList.add("span--inactive");
    resultDiv.innerText = "...";
}

document.querySelector(".cross").addEventListener("click", function () {
    overlay.classList.toggle("display--none");
});