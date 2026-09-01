document.addEventListener("DOMContentLoaded", () => {
  const summary = document.getElementById("progressSummary");
  const weeklyChart = document.getElementById("weeklyProgressChart");
  const strongestTopics = document.getElementById("strongestTopics");
  const weakTopics = document.getElementById("weakTopics");
  const studyConsistency = document.getElementById("studyConsistency");

  if (!summary) return;

  const data = mockData.progressData;

  summary.innerHTML = `
    <div class="card metric-card">
      <span class="metric-label">Overall Completion</span>
      <strong>${data.overallCompletion}%</strong>
      <div class="progress-bg"><div class="progress-fill" style="width: ${data.overallCompletion}%"></div></div>
    </div>
    <div class="card metric-card">
      <span class="metric-label">Topics Completed</span>
      <strong>${data.topicsCompleted}/${data.totalTopics}</strong>
    </div>
    <div class="card metric-card">
      <span class="metric-label">Quiz Average</span>
      <strong>${data.quizAverage}%</strong>
    </div>
    <div class="card metric-card">
      <span class="metric-label">Learning Time</span>
      <strong>${data.learningTime}</strong>
    </div>
    <div class="card metric-card">
      <span class="metric-label">Current Streak</span>
      <strong>${data.currentStreak} days</strong>
    </div>
  `;

  weeklyChart.innerHTML = data.weeklyActivity
    .map(
      (day) => `
        <div class="bar-column">
          <div class="bar-track"><div class="bar-fill" style="height: ${day.value}%"></div></div>
          <span>${day.day}</span>
        </div>
      `
    )
    .join("");

  strongestTopics.innerHTML = data.strongestTopics
    .map(
      (item) => `
        <div class="list-item">
          <span>${item.name}</span>
          <span class="badge success">${item.score}%</span>
        </div>
      `
    )
    .join("");

  weakTopics.innerHTML = data.needsImprovement
    .map(
      (item) => `
        <div class="list-item">
          <span>${item.name}</span>
          <span class="badge warning">${item.score}%</span>
        </div>
      `
    )
    .join("");

  studyConsistency.innerHTML = `
    <div class="list-item"><span>Daily goal</span><strong>${data.dailyGoal}</strong></div>
    <div class="list-item"><span>Sessions this week</span><strong>${data.sessionsThisWeek}</strong></div>
    <div class="list-item"><span>Focus time</span><strong>${data.focusTime}</strong></div>
  `;
});
