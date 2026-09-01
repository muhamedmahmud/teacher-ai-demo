document.addEventListener("DOMContentLoaded", async () => {
  const quizArea = document.getElementById("quizArea");
  if (!quizArea) return;

  const questions = mockData.quizQuestions;
  let currentIndex = 0;
  let score = 0;

  const renderQuestion = () => {
    const q = questions[currentIndex];
    if (!q) {
      renderSummary();
      return;
    }

    quizArea.innerHTML = `
      <div class="quiz-card">
        <div class="question-progress">
          <span>Question ${currentIndex + 1} of ${questions.length}</span>
          <span>Topic: ${q.topic}</span>
        </div>

        <h2 class="quiz-question">${q.question}</h2>

        <div class="answer-list">
          ${q.options
            .map(
              (option, idx) => `
                <button class="answer-btn" data-index="${idx}">${String.fromCharCode(65 + idx)}. ${option}</button>
              `
            )
            .join("")}
        </div>

        <div id="quizFeedback" class="quiz-feedback"></div>
      </div>
    `;

    const buttons = quizArea.querySelectorAll(".answer-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => selectAnswer(Number(button.dataset.index), q));
    });
  };

  const renderSummary = () => {
    const percentage = Math.round((score / questions.length) * 100);

    quizArea.innerHTML = `
      <div class="quiz-card">
        <p class="eyebrow">Quiz Complete</p>
        <h2 style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 12px;">Quiz Complete 🎉</h2>

        <div class="stats-grid" style="margin-top: 20px;">
          <div class="card stat-card">
            <span class="stat-label">Score</span>
            <h1>${score} / ${questions.length}</h1>
          </div>
          <div class="card stat-card">
            <span class="stat-label">Percentage</span>
            <h1>${percentage}%</h1>
          </div>
          <div class="card stat-card">
            <span class="stat-label">Correct answers</span>
            <h1>${score}</h1>
          </div>
          <div class="card stat-card">
            <span class="stat-label">Mistakes</span>
            <h1>${questions.length - score}</h1>
          </div>
        </div>

        <div class="quiz-actions">
          <button class="btn-outline" onclick="window.location.href='dashboard.html'">Continue Learning</button>
          <button class="btn-primary" onclick="window.location.reload()">Retry Quiz</button>
        </div>
      </div>
    `;
  };

  const selectAnswer = (selectedIndex, question) => {
    const buttons = quizArea.querySelectorAll(".answer-btn");
    buttons.forEach((button) => {
      button.disabled = true;
      const idx = Number(button.dataset.index);
      if (idx === question.answerIndex) button.classList.add("correct");
      if (idx === selectedIndex && idx !== question.answerIndex) button.classList.add("incorrect");
    });

    const isCorrect = selectedIndex === question.answerIndex;
    if (isCorrect) score += 1;

    const feedback = document.getElementById("quizFeedback");
    feedback.className = `quiz-feedback ${isCorrect ? "success" : "error"} visible`;
    feedback.innerHTML = `
      <h3>${isCorrect ? "Correct!" : "Not quite."}</h3>
      <p class="mt-10">${question.explanation}</p>
      <div class="quiz-actions" style="justify-content: flex-start; margin-top: 18px;">
        <button class="btn-primary" id="nextQuestionBtn">${currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}</button>
      </div>
    `;

    document.getElementById("nextQuestionBtn").addEventListener("click", () => {
      currentIndex += 1;
      renderQuestion();
    });
  };

  renderQuestion();
});
