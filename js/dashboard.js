document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.getElementById("dashboardStats");
  const activityContainer = document.getElementById("recentActivity");

  if (!statsContainer || !activityContainer) return;

  statsContainer.innerHTML = `
    <div class="card stat-card">
      <span class="stat-label"><i class="fas fa-book-open"></i> Course</span>
      <h3>${mockData.course.title}</h3>
      <div class="progress-bg"><div class="progress-fill" style="width: ${mockData.course.progress}%"></div></div>
      <p class="text-sm text-secondary">${mockData.course.progress}% Completed</p>
    </div>
    <div class="card stat-card text-center">
      <span class="stat-label">Average Score</span>
      <h1 class="text-success">${mockData.course.avgScore}%</h1>
      <p class="text-secondary mt-10">Across 4 quizzes</p>
    </div>
    <div class="card stat-card text-center">
      <span class="stat-label">Learning Time</span>
      <h1 class="text-accent">${mockData.course.learningTime}</h1>
      <p class="text-secondary mt-10">This month</p>
    </div>
    <div class="card stat-card text-center">
      <span class="stat-label">Topics</span>
      <h1>${mockData.course.topicsCompleted}/${mockData.course.totalTopics}</h1>
      <p class="text-secondary mt-10">Topics completed</p>
    </div>
  `;

  mockData.recentActivity.forEach((activity) => {
    activityContainer.innerHTML += `
      <div class="activity-item">
        <span>${activity.title}</span>
        <span class="text-sm text-secondary">${activity.time}</span>
      </div>
    `;
  });
});
