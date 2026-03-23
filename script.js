// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Rajasthan", correct: false },
      { text: "Bihar", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Chennai", correct: false },
    ],
  },
  {
    question: "Which Ipl Team is Greatest?",
    answers: [
      { text: "Mumbai Indians", correct: false },
      { text: "Royal Challengers Bengaluru (RCB)", correct: true },
      { text: "Chennai Super Kings", correct: false },
      { text: "Kolkata Knight Riders", correct: false },
    ],
  },
  {
    question: "Which Player Scored Most Centuries in The Ipl?",
    answers: [
      { text: "Rohit Sharma", correct: false },
      { text: "Mahendra Singh Dhoni", correct: false },
      { text: "Gautam Gambhir", correct: false },
      { text: "Virat Kohli", correct: true },
    ],
  },
  {
    question: "Which Team got banned in the ipl?",
    answers: [
      { text: "MI", correct: false },
      { text: "RCB", correct: false },
      { text: "CSK", correct: true },
      { text: "KKR", correct: false },
    ],
  },
  {
    question: "Which team is most followed on instagram?",
    answers: [
      { text: "RR", correct: false },
      { text: "CSK", correct: false },
      { text: "RCB", correct: true },
      { text: "SRH", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // ✅ FIX: Was "Array,from" (comma) — corrected to "Array.from" (dot)
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You are a Genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You're Almost There!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep Learning";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not Bad! Try Again to improve";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}