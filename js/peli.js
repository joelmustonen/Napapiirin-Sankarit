/* Pelin kysymykset */
const questions = [
    {
        question: "Mitä tarkoittaa saameksi 'bassi'?",
        answers: ["Pyhä", "Kylmä", "Kala", "Puu"],
        correct: 0
    },
    {
        question: "Mikä on 'guolli' suomeksi?",
        answers: ["Koira", "Kala", "Lumi", "Kivi"],
        correct: 1
    },
    {
        question: "Mitä tarkoittaa 'muorra'?",
        answers: ["Puu", "Aurinko", "Vesi", "Koti"],
        correct: 0
    },
    {
        question: "Mikä on 'njalla'?",
        answers: ["Varasto", "Joki", "Kivi", "Kettu"],
        correct: 0
    },
    {
        question: "Mitä tarkoittaa 'beaivi'?",
        answers: ["Aurinko", "Lintu", "Poro", "Metsä"],
        correct: 0
    },
    {
        question: "Mikä on 'mátki' suomeksi?",
        answers: ["Matka", "Maito", "Metsä", "Kala"],
        correct: 0
    },
    {
        question: "Mitä tarkoittaa 'ruoktu'?",
        answers: ["Koti", "Puu", "Lumi", "Koira"],
        correct: 0
    },
    {
        question: "Mikä on 'eanan' suomeksi?",
        answers: ["Maa", "Kala", "Kylä", "Vuori"],
        correct: 0
    },
    {
        question: "Mitä tarkoittaa 'váhnemat'?",
        answers: ["Vanhemmat", "Lapset", "Sisarukset", "Ystävät"],
        correct: 0
    },
    {
        question: "Mikä on 'suolu' suomeksi?",
        answers: ["Suo", "Sieni", "Puu", "Kivi"],
        correct: 0
    },
    {
        question: "Mitä tarkoittaa 'boazu'?",
        answers: ["Poro", "Kala", "Kettu", "Lintu"],
        correct: 0
    },
    {
        question: "Mikä on 'luomi' suomeksi?",
        answers: ["Lumi", "Leipä", "Kivi", "Puu"],
        correct: 0
    },
    {
        question: "Mitä tarkoittaa 'vázzit'?",
        answers: ["Kävellä", "Juosta", "Nukkua", "Syödä"],
        correct: 0
    }
];

// Sekoitetaan kysymykset Fisher–Yates -algoritmilla
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Sekoitetaan kysymykset ennen pelin alkua
shuffleArray(questions);

/* muuttujat */
let currentQuestion = 0;
let score = 0;

/* HTML-elementit */
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const soundCorrect = document.getElementById("sound-oikea");
const soundWrong = document.getElementById("sound-väärä");


const totalQuestions = questions.length;

/* Progressiopalkin päivitys */
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progress + "%";
}

/* Kysymyksen lataus ruudulle */
function loadQuestion() {
    const q = questions[currentQuestion];

    // Näytetään kysymys
    questionEl.textContent = q.question;

    // Tyhjennetään vanhat vastaukset
    answersEl.innerHTML = "";

    // Luodaan kopio vastauksista ja sekoitetaan ne
    let shuffledAnswers = q.answers.map((a, i) => ({ text: a, index: i }));
    shuffleArray(shuffledAnswers);

    // Luodaan napit sekoitetussa järjestyksessä
    shuffledAnswers.forEach(answerObj => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answerObj.text;

        btn.onclick = () => selectAnswer(btn, answerObj.index);

        answersEl.appendChild(btn);
    });

    // Päivitetään progressiopalkki
    updateProgress();

    // Seuraava-nappi pois käytöstä kunnes vastaus valittu
    nextBtn.disabled = true;
}

/* Vastauksen valinta */
function selectAnswer(button, index) {
    const q = questions[currentQuestion];

    // Estetään useampi valinta
    const allButtons = document.querySelectorAll(".answer-btn");
    allButtons.forEach(btn => btn.disabled = true);

    // Oikea vastaus
    if (index === q.correct) {
        button.classList.add("correct");
        score++;
        scoreEl.textContent = score;

        // Oikean vastauksen ääni
        soundCorrect.currentTime = 0;
        soundCorrect.play();

    } else {
        button.classList.add("wrong");
        allButtons[q.correct].classList.add("correct");

        // Väärän vastauksen ääni
        soundWrong.currentTime = 0;
        soundWrong.play();
    }

    nextBtn.disabled = false;
}

/* Seuraava kysymys */
nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        // Peli päättyy
        questionEl.textContent = "Peli päättyi!";
        answersEl.innerHTML = "";
        nextBtn.style.display = "none";
        restartBtn.style.display = "block";

        // Täytetään progressiopalkki
        progressBar.style.width = "100%";
    }
};

/* Aloita uudestaan */
restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;

    nextBtn.style.display = "block";
    restartBtn.style.display = "none";

    shuffleArray(questions); // Sekoitetaan uudelleen

    loadQuestion();
};

/* Pelin käynnistys */
loadQuestion();