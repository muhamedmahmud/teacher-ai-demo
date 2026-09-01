# AI Learning Navigator

AI Learning Navigator is a polished frontend prototype that simulates a document-to-learning product flow. It turns a PDF into a guided learning experience with a learning map, lessons, quizzes, and AI-powered chat backed by local mock data.

## Overview

This project demonstrates a realistic SaaS-style product UI without a backend or external AI API. Everything is powered by static mock data and local JavaScript logic so the prototype can run immediately in a browser.

## Features

- Landing page with document upload simulation
- Dashboard with course overview and activity feed
- Interactive learning map with topic selection
- Lesson reader with topic breakdown and completion state
- Quiz engine with scoring and answer feedback
- AI chat simulator grounded in document content
- Progress overview and settings screens
- Light/dark mode persistence with localStorage
- Responsive desktop and mobile UI

## Project Structure

```text
ai-learning-navigator/
├── index.html
├── dashboard.html
├── documents.html
├── learning.html
├── mindmap.html
├── quiz.html
├── chat.html
├── progress.html
├── settings.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── dashboard.js
│   ├── documents.js
│   ├── learning.js
│   ├── mindmap.js
│   ├── progress.js
│   ├── quiz.js
│   ├── chat.js
│   └── settings.js
├── README.md
└── assets/
    ├── icons/
    └── images/
```

## Libraries Used

- Font Awesome for UI icons
- Vanilla JavaScript for all application logic
- CSS custom properties for the design system and theme system

No backend framework or API library is required.

## How to Run

Open the project in a browser, or serve it locally with a simple static server:

```bash
cd d:/my_projects/route/front end/ai-teacher
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Mock Data Architecture

All application data lives in `js/data.js`. The project models a future API layer by providing async simulation functions such as:

```js
async function getDocument() {
  return Promise.resolve(mockData.documentLibrary[0]);
}

async function getTopics() {
  return Promise.resolve(mockData.topics);
}

async function getLesson(id) {
  return Promise.resolve(mockData.lessons.find((item) => item.id === id));
}
```

This creates a clean separation between data, logic, and UI while keeping the prototype fully local and runnable without a backend.

## Mind Map Implementation

The learning map uses an SVG-based interactive graph rendered with JavaScript. It supports:

- Node selection
- Distinct visual states for completed, current, available, and locked topics
- Clickable topic inspection panel
- Topic summary and learning actions

## Theme Persistence

The theme system uses CSS variables and localStorage. The selected theme is stored in the browser and restored on reload:

```js
localStorage.setItem("theme", "dark");
```

This keeps the dark mode consistent across pages in the prototype.

## Replacing Mock APIs with Real APIs

The project is structured so that the mock layer can be replaced later with real backend calls. In practice, replace the async functions in `js/data.js` with fetch/axios calls to a real API while keeping the same function names and return shapes.

## Notes

This is a frontend prototype only. It is designed to feel like a working product demo, not a production backend system.
