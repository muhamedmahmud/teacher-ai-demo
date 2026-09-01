document.addEventListener("DOMContentLoaded", async () => {
  const title = document.getElementById("lessonTitle");
  const body = document.getElementById("lessonBody");
  const meta = document.getElementById("lessonMeta");
  const lessonList = document.getElementById("lessonNavList");
  const markBtn = document.getElementById("markCompleteBtn");
  const prevBtn = document.getElementById("prevLessonBtn");
  const nextBtn = document.getElementById("nextLessonBtn");

  if (!title || !body) return;

  const params = new URLSearchParams(window.location.search);
  const lessonId = params.get("lesson") || "image-filtering";
  const allLessons = mockData.lessons;
  const lessonIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);
  const lesson = allLessons[Math.max(0, lessonIndex >= 0 ? lessonIndex : 0)];

  const renderNav = () => {
    lessonList.innerHTML = allLessons
      .map(
        (item, index) => `
          <li class="lesson-topic-item ${item.id === lesson.id ? "active" : ""}" data-id="${item.id}">
            <span>${index === 0 ? "✓" : index === 1 ? "→" : "○"}</span>
            <span>${item.title}</span>
          </li>
        `
      )
      .join("");

    lessonList.querySelectorAll(".lesson-topic-item").forEach((item) => {
      item.addEventListener("click", () => {
        const itemId = item.dataset.id;
        window.location.href = `learning.html?lesson=${itemId}`;
      });
    });
  };

  const renderLesson = () => {
    title.textContent = lesson.title;
    body.innerHTML = lesson.content;
    meta.innerHTML = `
      <h3>Topic Overview</h3>
      <p class="mt-10"><strong>Difficulty:</strong> ${lesson.difficulty}</p>
      <p class="mt-10"><strong>Estimated time:</strong> ${lesson.duration}</p>
      <div class="progress-bg mt-20"><div class="progress-fill" style="width: ${lesson.progress}%"></div></div>
      <p class="text-sm text-secondary mt-10">${lesson.progress}% Mastered</p>
      <div class="topic-goals">
        <h4>Learning objectives</h4>
        <ul>
          ${lesson.objectives.map((objective) => `<li>${objective}</li>`).join("")}
        </ul>
      </div>
      <div class="key-concepts">
        <h4>Key concepts</h4>
        <ul>
          ${lesson.keyConcepts.map((concept) => `<li>${concept}</li>`).join("")}
        </ul>
      </div>
    `;
  };

  renderNav();
  renderLesson();

  prevBtn?.addEventListener("click", () => {
    const previousLesson = allLessons[Math.max(0, lessonIndex - 1)];
    window.location.href = `learning.html?lesson=${previousLesson.id}`;
  });

  nextBtn?.addEventListener("click", () => {
    const nextLesson = allLessons[Math.min(allLessons.length - 1, lessonIndex + 1)];
    window.location.href = `learning.html?lesson=${nextLesson.id}`;
  });

  markBtn?.addEventListener("click", () => {
    markBtn.textContent = "Completed ✓";
    markBtn.style.background = "var(--success)";
    markBtn.style.color = "#fff";
  });
});
