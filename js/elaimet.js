// ELÄINPELI – Saame ↔ Suomi

const animals = [
  { fi: "kissa", se: "bussá" },
  { fi: "koira", se: "beana" },
  { fi: "poro", se: "boazu" },
  { fi: "karhu", se: "guovža" },
  { fi: "jänis", se: "násti" },
  { fi: "lammas", se: "sávza" },
  { fi: "hevonen", se: "heasta" },
  { fi: "lintu", se: "loddi" },
  { fi: "kala", se: "guolli" },
  { fi: "susi", se: "garra" }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const livesEl = document.getElementById("lives");

const soundOikea = document.getElementById("sound-oikea");
const soundVäärä = document.getElementById("sound-väärä");

let currentQuestion = null;
let currentCorrect = null;
let score = 0;
let questionIndex = 0;
const totalQuestions = 10;

let lives = 3;

function shuffle(array) {
  return array
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function updateLives() {
  if (!livesEl) return;
  livesEl.textContent = "❤️".repeat(lives);
}

function updateProgress() {
  const progress = (questionIndex / totalQuestions) * 100;
  progressBar.style.width = progress + "%";
}

function createQuestion() {
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const direction = Math.random() < 0.5 ? "fi->se" : "se->fi";

  let questionText;
  let correctAnswer;
  let pool;

  if (direction === "fi->se") {
    questionText = `Käännä saameksi: ${animal.fi}`;
    correctAnswer = animal.se;
    pool = animals.map(a => a.se);
  } else {
    questionText = `Käännä suomeksi: ${animal.se}`;
    correctAnswer = animal.fi;
    pool = animals.map(a => a.fi);
  }

  let options = [correctAnswer];
  const shuffledPool = shuffle(pool.filter(o => o !== correctAnswer));
  options = options.concat(shuffledPool.slice(0, 3));
  options = shuffle(options);

  return { questionText, options, correctAnswer };
}

function renderQuestion() {
  if (questionIndex >= totalQuestions) {
    endGame(false);
    return;
  }

  currentQuestion = createQuestion();
  currentCorrect = currentQuestion.correctAnswer;

  questionEl.textContent = currentQuestion.questionText;
  answersEl.innerHTML = "";
  nextBtn.disabled = true;

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = option;

    btn.addEventListener("click", () => handleAnswer(btn, option));
    answersEl.appendChild(btn);
  });

  updateProgress();
}

function handleAnswer(button, answer) {
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(b => (b.disabled = true));

  if (answer === currentCorrect) {
    score++;
    scoreEl.textContent = score;
    button.classList.add("correct");
    if (soundOikea) soundOikea.play();
  } else {
    button.classList.add("wrong");
    if (soundVäärä) soundVäärä.play();

    buttons.forEach(b => {
      if (b.textContent === currentCorrect) {
        b.classList.add("correct");
      }
    });

    lives--;
    updateLives();

    if (lives <= 0) {
      endGame(true);
      return;
    }
  }

  questionIndex++;
  nextBtn.disabled = false;
}

function endGame(died) {
  if (died) {
    questionEl.textContent = `Elämät loppuivat! Sait ${score} pistettä.`;
  } else {
    questionEl.textContent = `Peli päättyi! Sait ${score} / ${totalQuestions} pistettä.`;
  }

  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  score = 0;
  questionIndex = 0;
  lives = 3;

  scoreEl.textContent = score;
  updateLives();

  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";

  renderQuestion();
}

nextBtn.addEventListener("click", renderQuestion);
restartBtn.addEventListener("click", restartGame);

updateLives();
renderQuestion();
