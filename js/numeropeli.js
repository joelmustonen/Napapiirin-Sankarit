const questions = [
    { type: "s2n", question: "Mitä tarkoittaa 'okta'?", answers:["1","2","3","4"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'guokte'?", answers:["2","3","4","5"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'golbma'?", answers:["3","4","5","6"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'njeallje'?", answers:["4","5","6","7"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'vihtta'?", answers:["5","6","7","8"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'guhtta'?", answers:["6","7","8","9"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'čieža'?", answers:["7","8","9","10"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'gávcci'?", answers:["8","9","10","11"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'ovcci'?", answers:["9","10","11","12"], correct:0 },
    { type: "s2n", question: "Mitä tarkoittaa 'logi'?", answers:["10","11","12","13"], correct:0 },

    { type: "n2s", question: "Mikä on 1 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:0 },
    { type: "n2s", question: "Mikä on 2 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:1 },
    { type: "n2s", question: "Mikä on 3 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:2 },
    { type: "n2s", question: "Mikä on 4 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:3 },
    { type: "n2s", question: "Mikä on 5 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:0 },
    { type: "n2s", question: "Mikä on 6 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:1 },
    { type: "n2s", question: "Mikä on 7 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:2 },
    { type: "n2s", question: "Mikä on 8 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:3 }
];

/* ---  sekoitus --- */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/* --- PELIN MUUTTUJAT --- */
let currentQuestion = 0;
let score = 0;
let combo = 0;
let energy = 100;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const closeBtn = document.getElementById("closeBtn");
const progressBar = document.getElementById("progressBar");
const soundCorrect = document.getElementById("sound-oikea");
const soundWrong = document.getElementById("sound-väärä");
const livesEl = document.getElementById("lives");

const totalQuestions = questions.length;

/* --- PÄIVITYKSET --- */
function updateProgress() {
    progressBar.style.width = (currentQuestion / totalQuestions) * 100 + "%";
    livesEl.textContent = "⚡ Energia: " + energy + "%";
}

/* --- LADATAAN KYSYMYS --- */
function loadQuestion() {
    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    let shuffled = q.answers.map((a, i) => ({ text: a, index: i }));
    shuffleArray(shuffled);

    shuffled.forEach(a => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = a.text;

        btn.onclick = () => selectAnswer(btn, a.index);

        answersEl.appendChild(btn);
    });

    nextBtn.disabled = true;
    updateProgress();
}

/* --- VASTAUKSEN VALINTA --- */
function selectAnswer(button, chosenIndex) {
    const q = questions[currentQuestion];
    const all = document.querySelectorAll(".answer-btn");

    all.forEach(b => b.disabled = true);

    if (chosenIndex === q.correct) {
        button.classList.add("correct");
        combo++;
        score += 1 + Math.floor(combo / 3); // combo-bonus
        soundCorrect.play();
    } else {
        button.classList.add("wrong");
        all.forEach(b => {
            if (b.textContent === q.answers[q.correct]) b.classList.add("correct");
        });
        combo = 0;
        energy -= 25;
... (68 riviä jäljellä)
