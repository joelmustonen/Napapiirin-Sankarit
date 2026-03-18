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
    }
];

/* muuttujat */
let currentQuestion = 0; // Seuraa monesko kysymys on menossa
let score = 0;           // Pelaajan pisteet

/* HTML-elementit */
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");


/* Kysymyksen lataus ruudulle */
function loadQuestion() {
    const q = questions[currentQuestion];

    // Näytetään kysymys
    questionEl.textContent = q.question;

    // Tyhjennetään vanhat vastaukset
    answersEl.innerHTML = "";

    // Luodaan vastausnapit
    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answer;

        // Kun nappia klikataan = tarkistetaan vastaus
        btn.onclick = () => selectAnswer(btn, index);

        answersEl.appendChild(btn);
    });

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
    } 
    // Väärä vastaus
    else {
        button.classList.add("wrong");
        allButtons[q.correct].classList.add("correct");
    }

    // Nyt voi siirtyä seuraavaan kysymykseen
    nextBtn.disabled = false;
}

/* Seuraava kysymys nappi */
nextBtn.onclick = () => {
    currentQuestion++;

    // Jos kysymyksiä jäljellä = jatketaan
    if (currentQuestion < questions.length) {
        loadQuestion();
    } 

    // Muuten peli päättyy
    else {
    questionEl.textContent = "Peli päättyi!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";      // Piilotetaan Seuraava-nappi
    restartBtn.style.display = "block";  // Näytetään Aloita uudestaan -nappi
}

// Aloita uudestaan -napin toiminto
restartBtn.onclick = () => {
    // Palautetaan peli alkutilaan
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;

    // Näytetään Seuraava-nappi uudelleen
    nextBtn.style.display = "block";

    // Piilotetaan restart-nappi
    restartBtn.style.display = "none";

    // Ladataan ensimmäinen kysymys
    loadQuestion();
};


};

/* Pelin kyännistys */
loadQuestion();
