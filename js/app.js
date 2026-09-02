document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  injectSidebar();
  bindThemeControls();
  bindUploadFlow();
  bindSidebarMobileMenu();
});

function initTheme() {
  const preferred = localStorage.getItem("theme") || "light";
  applyTheme(preferred);
}

function applyTheme(mode) {
  const html = document.documentElement;
  if (mode === "dark") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.removeAttribute("data-theme");
  }

  const radios = document.querySelectorAll('input[name="themeMode"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === mode;
  });

  const themeButton = document.getElementById("themeToggleButton");
  if (themeButton) {
    const isDark = mode === "dark";
    themeButton.innerHTML = isDark
      ? '<i class="fas fa-sun"></i> Light mode'
      : '<i class="fas fa-moon"></i> Dark mode';
  }
}

function toggleTheme() {
  const currentMode = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextMode = currentMode === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextMode);
  applyTheme(nextMode);
}

function bindThemeControls() {
  const radioButtons = document.querySelectorAll('input[name="themeMode"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const value = radio.value;
      localStorage.setItem("theme", value === "system" ? "light" : value);
      applyTheme(value === "system" ? "light" : value);
    });
  });
}

function injectSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const links = [
    { href: "dashboard.html", label: "Dashboard", icon: "fa-house" },
    { href: "documents.html", label: "My Documents", icon: "fa-file-lines" },
    { href: "mindmap.html", label: "Learning Map", icon: "fa-sitemap" },
    { href: "learning.html", label: "Lessons", icon: "fa-book-open" },
    { href: "quiz.html", label: "Quizzes", icon: "fa-circle-check" },
    { href: "chat.html", label: "AI Chat", icon: "fa-comments" },
    { href: "progress.html", label: "Progress", icon: "fa-chart-line" },
    { href: "settings.html", label: "Settings", icon: "fa-gear" },
  ];

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="brand">
        <img src="assets/images/logo.png" alt="Your Smart Teacher" class="brand-logo" />
        <span class="brand-name"><span class="brand-initial">Y</span>our <span class="smart-word"><span class="brand-initial">S</span>mart</span> <span class="brand-initial">T</span>eacher</span>
      </div>
      <button class="mobile-menu-toggle" id="sidebarToggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
        <i class="fas fa-bars"></i>
        <span>Menu</span>
      </button>
    </div>
    <nav class="nav-menu">
      ${links
        .map(
          (item) => `
            <a href="${item.href}" class="nav-item ${page === item.href ? "active" : ""}">
              <i class="fas ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          `
        )
        .join("")}
    </nav>
    <button id="themeToggleButton" class="btn-outline sidebar-theme-toggle" onclick="toggleTheme()">
      <i class="fas fa-moon"></i>
      Dark mode
    </button>
  `;
}

function bindSidebarMobileMenu() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");

  if (!sidebar || !toggle) return;

  const setMenuState = (isOpen) => {
    sidebar.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fas fa-xmark"></i><span>Close</span>'
      : '<i class="fas fa-bars"></i><span>Menu</span>';
  };

  const updateMenuForViewport = () => {
    if (window.innerWidth > 840) {
      sidebar.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.style.display = "none";
      return;
    }

    toggle.style.display = "inline-flex";
    if (!sidebar.classList.contains("is-open")) {
      setMenuState(false);
    }
  };

  toggle.addEventListener("click", () => {
    if (window.innerWidth <= 840) {
      const shouldOpen = !sidebar.classList.contains("is-open");
      setMenuState(shouldOpen);
    }
  });

  updateMenuForViewport();
  window.addEventListener("resize", updateMenuForViewport);
}

function bindUploadFlow() {
  const uploadZone = document.getElementById("uploadZone");
  const startBtn = document.getElementById("startUploadBtn");
  if (!uploadZone) return;

  const hiddenInput = document.getElementById("pdfInput");
  const uploadContent = uploadZone.querySelector(".upload-content");
  const fileMeta = uploadZone.querySelector(".file-meta");
  const uploadStatus = uploadZone.querySelector(".upload-status");
  const progressBar = uploadZone.querySelector(".upload-progress-bar");
  const removeFileBtn = uploadZone.querySelector(".remove-file");

  if (startBtn && hiddenInput) {
    startBtn.addEventListener("click", () => {
      const sampleFile = new File(["sample"], "Computer Vision Fundamentals.pdf", { type: "application/pdf" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(sampleFile);
      hiddenInput.files = dataTransfer.files;
      hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  const setProgressState = (label, percentage) => {
    uploadStatus.textContent = label;
    progressBar.style.width = `${percentage}%`;
  };

  const simulateUpload = (fileName = "Computer Vision Fundamentals.pdf") => {
    uploadZone.classList.add("is-processing");
    uploadZone.classList.remove("is-dragging");
    uploadContent.innerHTML = `
      <div class="processing-initial">
        <i class="fas fa-spinner fa-spin text-accent" style="font-size: 3rem;"></i>
        <h3>Processing document</h3>
      </div>
    `;

    if (fileMeta) {
      fileMeta.innerHTML = `
        <div class="file-pill">
          <i class="fas fa-file-pdf"></i>
          <span>${fileName}</span>
        </div>
      `;
    }

    setProgressState("Uploading...", 15);

    setTimeout(() => setProgressState("Extracting content...", 36), 800);
    setTimeout(() => setProgressState("Analyzing topics...", 58), 1600);
    setTimeout(() => setProgressState("Building learning map...", 84), 2600);
    setTimeout(() => {
      setProgressState("Ready!", 100);
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    }, 3600);
  };

  const handleFile = (file) => {
    if (!file) return;
    uploadZone.classList.add("has-file");
    if (fileMeta) {
      fileMeta.innerHTML = `
        <div class="file-pill">
          <i class="fas fa-file-pdf"></i>
          <span>${file.name}</span>
        </div>
        <div class="file-size">${(file.size / 1024 / 1024).toFixed(1)} MB</div>
      `;
    }
    if (removeFileBtn) {
      removeFileBtn.style.display = "inline-flex";
    }
    simulateUpload(file.name);
  };

  if (hiddenInput) {
    hiddenInput.addEventListener("change", (event) => handleFile(event.target.files[0]));
  }

  uploadZone.addEventListener("click", (event) => {
    if (event.target.closest(".remove-file")) {
      event.stopPropagation();
      if (hiddenInput) hiddenInput.value = "";
      uploadZone.classList.remove("has-file", "is-processing");
      uploadZone.querySelector(".upload-content").innerHTML = `
        <div class="upload-icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <h2>Drag & Drop your PDF here</h2>
        <p class="text-secondary">or click to browse files</p>
      `;
      if (fileMeta) fileMeta.innerHTML = "";
      if (removeFileBtn) removeFileBtn.style.display = "none";
      setProgressState("Waiting for document", 0);
      return;
    }

    if (!uploadZone.classList.contains("is-processing")) {
      hiddenInput?.click();
    }
  });

  uploadZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadZone.classList.add("is-dragging");
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("is-dragging");
  });

  uploadZone.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadZone.classList.remove("is-dragging");
    const file = event.dataTransfer.files[0];
    handleFile(file);
  });
}

window.toggleTheme = toggleTheme;
