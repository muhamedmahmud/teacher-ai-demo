const mind = {
    meta: {
        name: "Teacher AI Mind Map",
        author: "Teacher AI",
        version: "1.0"
    },

    format: "node_tree",

    data: {
        id: "root",
        topic: "Design Patterns",
        "background-color": "#0875a9",
        "foreground-color": "#ffffff",
        "font-size": "18px",

        children: [
            {
                id: "strategy",
                topic: "Strategy Pattern",
                "background-color": "#073b59",

                children: [
                    {
                        id: "encapsulation",
                        topic: "Encapsulate behaviors"
                    },
                    {
                        id: "interchangeable",
                        topic: "Interchangeable algorithms"
                    },
                    {
                        id: "composition",
                        topic: "Favor composition"
                    }
                ]
            },

            {
                id: "observer",
                topic: "Observer Pattern",
                "background-color": "#073b59",

                children: [
                    {
                        id: "subject",
                        topic: "Subject"
                    },
                    {
                        id: "observers",
                        topic: "Observers"
                    },
                    {
                        id: "notification",
                        topic: "Notifications"
                    }
                ]
            },

            {
                id: "factory",
                topic: "Factory Pattern",
                "background-color": "#073b59",

                children: [
                    {
                        id: "creation",
                        topic: "Object creation"
                    },
                    {
                        id: "loose",
                        topic: "Loose coupling"
                    }
                ]
            },

            {
                id: "benefits",
                topic: "Benefits",
                "background-color": "#073b59",

                children: [
                    {
                        id: "flexibility",
                        topic: "Flexibility"
                    },
                    {
                        id: "maintenance",
                        topic: "Easy maintenance"
                    }
                ]
            }
        ]
    }
};

const options = {
    container: "jsmind_container",
    editable: false,
    theme: "primary",

    mode: "full",

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

jm.show(mind);

const pdfInput = document.getElementById("pdfInput");
const fileName = document.getElementById("fileName");

pdfInput.addEventListener("change", function () {
    if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
    } else {
        fileName.textContent = "No file selected";
    }
});

const buttons = document.querySelectorAll(".map-actions button");

buttons[0].addEventListener("click", function () {
    jm.view.zoomOut();
});

buttons[1].addEventListener("click", function () {
    jm.view.zoomIn();
});

buttons[2].addEventListener("click", function () {
    jm.view.zoomFit();
});