/* --- NUMEROPELI (Vain sinun osuutesi) --- */

const numGameNumbers = [
    { s: "okta", n: 1 }, { s: "guokte", n: 2 }, { s: "golbma", n: 3 },
    { s: "njeallje", n: 4 }, { s: "vihtta", n: 5 }, { s: "guhtta", n: 6 },
    { s: "čieža", n: 7 }, { s: "gávcci", n: 8 }, { s: "ovcci", n: 9 }, { s: "logi", n: 10 }
];

let currentTargetNum;
const numSoundCorrect = new Audio('../äänet/oikea.mp3');
const numSoundWrong = new Audio('../äänet/väärä.mp3');

function initNumberGame() {
    const answerContainer = document.getElementById('answers');
    const targetDisplay = document.getElementById('target-word');
    const feedback = document.getElementById('feedback');

    // Jos näitä ei löydy, ollaan väärällä sivulla -> älä tee mitään
    if (!answerContainer || !targetDisplay) return;

    if (feedback) feedback.innerText = "";
    answerContainer.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        btn.className = "game-btn"; 
        btn.onclick = () => checkNumberAnswer(i);
        answerContainer.appendChild(btn);
    }
    nextNumberRound();
}

function nextNumberRound() {
    const targetDisplay = document.getElementById('target-word');
    if (!targetDisplay) return;
    
    currentTargetNum = numGameNumbers[Math.floor(Math.random() * numGameNumbers.length)];
    targetDisplay.innerText = currentTargetNum.s;
}

function checkNumberAnswer(chosenNum) {
    const feedback = document.getElementById('feedback');
    
    if (chosenNum === currentTargetNum.n) {
        if (feedback) {
            feedback.innerText = "Vuoitu! (Oikein!)";
            feedback.style.color = "green";
        }
        numSoundCorrect.currentTime = 0;
        numSoundCorrect.play();
        setTimeout(initNumberGame, 1500); 
    } else {
        if (feedback) {
            feedback.innerText = "Geahččal oktii vel! (Yritä uudelleen!)";
            feedback.style.color = "red";
        }
        numSoundWrong.currentTime = 0;
        numSoundWrong.play();
    }
}

// Käynnistää pelin kun sivu on ladattu
window.addEventListener('load', initNumberGame);