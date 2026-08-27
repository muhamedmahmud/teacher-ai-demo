const state = {
    file: null,
    isProcessing: false,
    generated: false,
    zoom: 1,
    nodes: []
};

const mindMaps = {
    design: {
        root: "Design Patterns",
        branches: [
            {
                topic: "Strategy Pattern",
                children: [
                    "Encapsulate behaviors",
                    "Interchangeable algorithms",
                    "Favor composition",
                    "Runtime flexibility"
                ]
            },
            {
                topic: "Observer Pattern",
                children: [
                    "Subject",
                    "Observers",
                    "Notifications",
                    "Loose coupling"
                ]
            },
            {
                topic: "Factory Pattern",
                children: [
                    "Object creation",
                    "Loose coupling",
                    "Abstraction",
                    "Maintainability"
                ]
            },
            {
                topic: "Benefits",
                children: [
                    "Flexibility",
                    "Reusability",
                    "Maintainability",
                    "Scalability"
                ]
            }
        ]
    },

    programming: {
        root: "Programming Fundamentals",
        branches: [
            {
                topic: "Variables",
                children: [
                    "Data Types",
                    "Scope",
                    "Constants",
                    "Memory"
                ]
            },
            {
                topic: "Control Flow",
                children: [
                    "If Statements",
                    "Loops",
                    "Switch",
                    "Conditions"
                ]
            },
            {
                topic: "Functions",
                children: [
                    "Parameters",
                    "Return Values",
                    "Scope",
                    "Reusability"
                ]
            },
            {
                topic: "OOP",
                children: [
                    "Classes",
                    "Objects",
                    "Inheritance",
                    "Polymorphism"
                ]
            }
        ]
    },

    database: {
        root: "Database Systems",
        branches: [
            {
                topic: "SQL",
                children: [
                    "SELECT",
                    "INSERT",
                    "UPDATE",
                    "DELETE"
                ]
            },
            {
                topic: "Database Design",
                children: [
                    "Tables",
                    "Relationships",
                    "Primary Keys",
                    "Foreign Keys"
                ]
            },
            {
                topic: "Normalization",
                children: [
                    "1NF",
                    "2NF",
                    "3NF",
                    "BCNF"
                ]
            },
            {
                topic: "Performance",
                children: [
                    "Indexes",
                    "Query Optimization",
                    "Caching",
                    "Transactions"
                ]
            }
        ]
    },

    generic: {
        root: "Study Material",
        branches: [
            {
                topic: "Main Concepts",
                children: [
                    "Definitions",
                    "Important Ideas",
                    "Examples",
                    "Key Terms"
                ]
            },
            {
                topic: "Core Topics",
                children: [
                    "Theory",
                    "Applications",
                    "Methods",
                    "Principles"
                ]
            },
            {
                topic: "Details",
                children: [
                    "Notes",
                    "Facts",
                    "Relationships",
                    "Observations"
                ]
            },
            {
                topic: "Summary",
                children: [
                    "Important Points",
                    "Review",
                    "Questions",
                    "Takeaways"
                ]
            }
        ]
    }
};

let currentMap = mindMaps.design;

const options = {
    container: "jsmind_container",
    editable: false,
    theme: "primary",

    view: {
        engine: "canvas",
        hmargin: 80,
        vmargin: 50,
        line_width: 2,
        line_color: "#23617d",
        draggable: true,
        zoom: true
    },

    layout: {
        hspace: 45,
        vspace: 20,
        pspace: 15
    }
};

const jm = new jsMind(options);

function buildMindMap(map) {
    const children = [];

    map.branches.forEach((branch, index) => {

        const branchNode = {
            id: `branch-${index}`,
            topic: branch.topic,
            "background-color": "#073b59",
            children: []
        };

        branch.children.forEach((child, childIndex) => {
            branchNode.children.push({
                id: `branch-${index}-child-${childIndex}`,
                topic: child,
                "background-color": "#052d45"
            });
        });

        children.push(branchNode);
    });

    return {
        meta: {
            name: "Teacher AI Generated Map",
            author: "Teacher AI",
            version: "1.0"
        },

        format: "node_tree",

        data: {
            id: "root",
            topic: map.root,
            "background-color": "#0875a9",
            "foreground-color": "#ffffff",
            "font-size": "18px",
            children
        }
    };
}

function renderMap() {
    jm.show(buildMindMap(currentMap));
    state.generated = true;
}

renderMap();

const pdfInput = document.getElementById("pdfInput");
const fileName = document.getElementById("fileName");
const uploadCard = document.querySelector(".upload-card");
const primaryBtn = document.querySelector(".primary-btn");
const mindMapContainer = document.querySelector(".mindmap-container");

function showNotification(message, type = "info") {

    const oldNotification = document.querySelector(".app-notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className = "app-notification";

    notification.innerHTML = `
        <span>${type === "success" ? "✓" : "ⓘ"}</span>
        <p>${message}</p>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("hide");

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function detectMapFromFile(fileName) {

    const name = fileName.toLowerCase();

    if (
        name.includes("design") ||
        name.includes("pattern") ||
        name.includes("software")
    ) {
        return mindMaps.design;
    }

    if (
        name.includes("programming") ||
        name.includes("code") ||
        name.includes("program")
    ) {
        return mindMaps.programming;
    }

    if (
        name.includes("database") ||
        name.includes("sql") ||
        name.includes("db")
    ) {
        return mindMaps.database;
    }

    return mindMaps.generic;
}

function simulateProcessing(file) {

    if (state.isProcessing) return;

    state.isProcessing = true;
    state.file = file;

    uploadCard.classList.add("processing");

    fileName.innerHTML = `
        <span class="loader"></span>
        Analyzing ${file.name}
    `;

    primaryBtn.disabled = true;
    primaryBtn.innerHTML = "Analyzing...";

    const progress = document.createElement("div");

    progress.className = "processing-progress";

    progress.innerHTML = `
        <div class="progress-info">
            <span>Analyzing document</span>
            <span id="progressValue">0%</span>
        </div>

        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
    `;

    uploadCard.appendChild(progress);

    const progressFill = progress.querySelector(".progress-fill");
    const progressValue = progress.querySelector("#progressValue");

    let percentage = 0;

    const interval = setInterval(() => {

        percentage += Math.floor(Math.random() * 12) + 5;

        if (percentage >= 100) {
            percentage = 100;
        }

        progressFill.style.width = `${percentage}%`;
        progressValue.textContent = `${percentage}%`;

        if (percentage === 100) {

            clearInterval(interval);

            setTimeout(() => {

                finishProcessing(file);

                progress.remove();

            }, 700);
        }

    }, 350);
}

function finishProcessing(file) {

    currentMap = detectMapFromFile(file.name);

    renderMap();

    state.isProcessing = false;

    uploadCard.classList.remove("processing");

    fileName.innerHTML = `
        <span class="file-success">✓</span>
        ${file.name}
    `;

    primaryBtn.disabled = false;

    primaryBtn.innerHTML = `
        <span>✦</span>
        Generate Mind Map
    `;

    updateStats(file);

    showNotification(
        "Mind map generated successfully!",
        "success"
    );
}

function updateStats(file) {

    const nodeCount = currentMap.branches.reduce(
        (total, branch) => total + branch.children.length + 1,
        1
    );

    const heading = document.querySelector(".map-heading");

    let stats = document.querySelector(".map-stats");

    if (!stats) {

        stats = document.createElement("div");

        stats.className = "map-stats";

        heading.appendChild(stats);
    }

    stats.innerHTML = `
        <span>${nodeCount} concepts</span>
        <span>•</span>
        <span>${Math.floor(file.size / 1024)} KB</span>
        <span>•</span>
        <span>AI Generated</span>
    `;
}

pdfInput.addEventListener("change", function () {

    if (!this.files.length) return;

    const file = this.files[0];

    if (file.type !== "application/pdf") {

        showNotification(
            "Please select a PDF file.",
            "info"
        );

        this.value = "";

        return;
    }

    if (file.size > 20 * 1024 * 1024) {

        showNotification(
            "File is too large. Maximum size is 20 MB.",
            "info"
        );

        this.value = "";

        return;
    }

    fileName.textContent = file.name;

    showNotification(
        `${file.name} selected.`,
        "success"
    );

    simulateProcessing(file);
});

primaryBtn.addEventListener("click", function () {

    if (state.isProcessing) return;

    if (!state.file) {

        pdfInput.click();

        return;
    }

    simulateProcessing(state.file);
});

const mapButtons = document.querySelectorAll(".map-actions button");

if (mapButtons.length >= 3) {

    mapButtons[0].addEventListener("click", () => {
        jm.view.zoomOut();
    });

    mapButtons[1].addEventListener("click", () => {
        jm.view.zoomIn();
    });

    mapButtons[2].addEventListener("click", () => {
        jm.view.zoomFit();
    });
}

const navItems = document.querySelectorAll(
    ".nav-item, .mobile-nav-item"
);

navItems.forEach(item => {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

        const label = this.querySelector("label, small");

        if (label) {

            showNotification(
                `${label.textContent} section selected.`
            );
        }
    });
});

mindMapContainer.addEventListener(
    "dblclick",
    () => {
        jm.view.zoomFit();

        showNotification(
            "Mind map centered."
        );
    }
);

document.addEventListener("keydown", event => {

    if (event.key === "+" || event.key === "=") {
        jm.view.zoomIn();
    }

    if (event.key === "-") {
        jm.view.zoomOut();
    }

    if (event.key === "0") {
        jm.view.zoomFit();
    }
});