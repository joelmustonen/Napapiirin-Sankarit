
const questions = [
    {question:"Mitä tarkoittaa 'okta'?", answers:["1","2","3","4"], correct:0},
    {question:"Mitä tarkoittaa 'guokte'?", answers:["2","3","4","5"], correct:0},
    {question:"Mitä tarkoittaa 'golbma'?", answers:["3","4","5","6"], correct:0},
    {question:"Mitä tarkoittaa 'njeallje'?", answers:["4","5","6","7"], correct:0},
    {question:"Mitä tarkoittaa 'vihtta'?", answers:["5","6","7","8"], correct:0},
    {question:"Mitä tarkoittaa 'guhtta'?", answers:["6","7","8","9"], correct:0},
    {question:"Mitä tarkoittaa 'čieža'?", answers:["7","8","9","10"], correct:0},
    {question:"Mitä tarkoittaa 'gávcci'?", answers:["8","9","10","11"], correct:0},
    {question:"Mitä tarkoittaa 'ovcci'?", answers:["9","10","11","12"], correct:0},
    {question:"Mitä tarkoittaa 'logi'?", answers:["10","11","12","13"], correct:0},
    {question:"Mikä on 1 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:0},
    {question:"Mikä on 2 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:1},
    {question:"Mikä on 3 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:2},
    {question:"Mikä on 4 saameksi?", answers:["okta","guokte","golbma","njeallje"], correct:3},
    {question:"Mikä on 5 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:0},
    {question:"Mikä on 6 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:1},
    {question:"Mikä on 7 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:2},
    {question:"Mikä on 8 saameksi?", answers:["vihtta","guhtta","čieža","gávcci"], correct:3}
];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let currentQuestion = 0;
let score = 0;


const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const soundCorrect = document.getElementById("sound-oikea");
const soundWrong = document.getElementById("sound-väärä");

const totalQuestions = questions.length;


function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
}


function loadQuestion() {
    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    let shuffledAnswers = q.answers.map((a, i) => ({ text: a, index: i }));
    shuffleArray(shuffledAnswers);

    shuffledAnswers.forEach(answerObj => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answerObj.text;

    btn.onclick = () => {
        selectAnswer(btn, answerObj.text);
    };

    answersEl.appendChild(btn);
});

    updateProgress();
    nextBtn.disabled = true;
}


function selectAnswer(button, selectedText) {
    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll(".answer-btn");

    allButtons.forEach(btn => btn.disabled = true);

    const correctText = q.answers[q.correct];

    if (selectedText === correctText) {
        button.classList.add("correct");
        score++;
        scoreEl.textContent = score;
        soundCorrect.currentTime = 0;
        soundCorrect.play();
    } else {
        button.classList.add("wrong");

        allButtons.forEach(btn => {
            if (btn.textContent === correctText) {
                btn.classList.add("correct");
            }
        });

        soundWrong.currentTime = 0;
        soundWrong.play();
    }

    nextBtn.disabled = false;
}



nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "Peli päättyi!";
        answersEl.innerHTML = "";
        nextBtn.style.display = "none";
        restartBtn.style.display = "block";
        progressBar.style.width = "100%";
    }
};


restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;

    nextBtn.style.display = "block";
    restartBtn.style.display = "none";

    shuffleArray(questions);

    loadQuestion();
};


shuffleArray(questions);
loadQuestion();