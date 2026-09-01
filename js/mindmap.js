document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("mindmapContainer");
  const details = document.getElementById("topicDetails");

  if (!container || !details) return;

  const root = mockData.topics[0];
  const nodeMap = new Map();
  const positions = new Map();

  const flatten = (node, parent = null) => {
    const record = { ...node, parent }
    nodeMap.set(node.id, record);
    (node.children || []).forEach((child) => flatten(child, node.id));
  };
  flatten(root);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 800 640");
  container.appendChild(svg);

  const buildNodeLayout = () => {
    const centerX = 400;
    const centerY = 320;
    positions.set(root.id, { x: centerX, y: centerY });

    const branchPositions = [
      [{ x: 180, y: 180 }, { x: 620, y: 170 }, { x: 180, y: 420 }, { x: 620, y: 430 }],
      [{ x: 110, y: 130 }, { x: 670, y: 120 }, { x: 100, y: 370 }, { x: 680, y: 380 }, { x: 150, y: 520 }, { x: 620, y: 510 }],
      [{ x: 90, y: 250 }, { x: 700, y: 220 }, { x: 90, y: 460 }, { x: 700, y: 470 }],
    ];

    let offsetIndex = 0;
    const assign = (node, depth = 0) => {
      const children = node.children || [];
      const placements = branchPositions[Math.min(depth, branchPositions.length - 1)] || [{ x: centerX, y: centerY }];

      children.forEach((child, index) => {
        const placement = placements[index % placements.length] || { x: centerX, y: centerY };
        positions.set(child.id, placement);
        assign(child, depth + 1);
      });
    };

    assign(root);
  };

  const getNodeColor = (status) => {
    switch (status) {
      case "completed": return "#10b981";
      case "current": return "#6a35ff";
      case "locked": return "#94a3b8";
      default: return "#3b82f6";
    }
  };

  const drawConnections = () => {
    const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    layer.setAttribute("stroke", "rgba(106, 53, 255, 0.4)");
    layer.setAttribute("stroke-width", "1.4");
    layer.setAttribute("fill", "none");

    nodeMap.forEach((node) => {
      if (!node.parent) return;
      const parentPos = positions.get(node.parent);
      const currentPos = positions.get(node.id);
      if (!parentPos || !currentPos) return;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const mid = (parentPos.x + currentPos.x) / 2;
      path.setAttribute("d", `M ${parentPos.x} ${parentPos.y} C ${mid} ${parentPos.y}, ${mid} ${currentPos.y}, ${currentPos.x} ${currentPos.y}`);
      layer.appendChild(path);
    });

    svg.appendChild(layer);
  };

  const renderNodes = () => {
    nodeMap.forEach((node) => {
      const pos = positions.get(node.id) || { x: 400, y: 320 };
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("data-id", node.id);
      group.style.cursor = "pointer";

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pos.x);
      circle.setAttribute("cy", pos.y);
      circle.setAttribute("r", node.id === root.id ? 46 : 26);
      circle.setAttribute("fill", node.id === root.id ? "rgba(106,53,255,0.1)" : "#ffffff");
      circle.setAttribute("stroke", getNodeColor(node.status || "available"));
      circle.setAttribute("stroke-width", node.id === root.id ? "2.4" : "2");

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", pos.x);
      label.setAttribute("y", pos.y + 5);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", node.id === root.id ? "15" : "12");
      label.setAttribute("font-weight", node.id === root.id ? "700" : "600");
      label.setAttribute("fill", "#111827");
      label.textContent = node.title.length > 12 ? `${node.title.slice(0, 10)}…` : node.title;

      const indicator = document.createElementNS("http://www.w3.org/2000/svg", "text");
      indicator.setAttribute("x", pos.x + (node.id === root.id ? 52 : 32));
      indicator.setAttribute("y", pos.y - 8);
      indicator.setAttribute("font-size", "12");
      indicator.setAttribute("fill", getNodeColor(node.status || "available"));
      indicator.textContent = node.status === "completed" ? "✓" : node.status === "current" ? "→" : node.status === "locked" ? "🔒" : "○";

      group.appendChild(circle);
      group.appendChild(label);
      group.appendChild(indicator);
      group.addEventListener("click", () => selectTopic(node));
      svg.appendChild(group);
    });
  };

  const selectTopic = (node) => {
    const status = node.status || "available";
    details.innerHTML = `
      <div class="section-header">
        <h3>${node.title}</h3>
        <span class="badge ${status === "locked" ? "warning" : "success"}">${status === "locked" ? "Locked" : status === "current" ? "Current" : "Available"}</span>
      </div>

      <p class="topic-summary">${node.explanation || "This concept is part of the broader learning journey and helps build practical understanding."}</p>

      <div class="topic-meta-list">
        <div class="meta-row-item"><span>Difficulty</span><strong>${node.difficulty || "Beginner"}</strong></div>
        <div class="meta-row-item"><span>Time</span><strong>${node.duration || "10 min"}</strong></div>
        <div class="meta-row-item"><span>Progress</span><strong>${node.progress || 0}%</strong></div>
      </div>

      <div class="topic-goals">
        <h4>Learning objectives</h4>
        <ul>
          ${(node.objectives || ["Understand the core idea", "Apply the concept in examples", "Practice with guided tasks"]).map((objective) => `<li>${objective}</li>`).join("")}
        </ul>
      </div>

      <div class="key-concepts">
        <h4>Prerequisites</h4>
        <ul>
          ${(node.prerequisites || ["Basic understanding of the topic"]).map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="mindmap-actions">
        <button class="btn-primary" onclick="window.location.href='learning.html?lesson=image-filtering'">Start Learning</button>
        <button class="btn-outline" onclick="window.location.href='quiz.html'">Take Quiz</button>
      </div>
    `;

    const activeNode = details.querySelector(".badge");
    if (activeNode) {
      activeNode.style.background = status === "locked" ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)";
    }
  };

  buildNodeLayout();
  drawConnections();
  renderNodes();
  const currentNode = root.children?.[2] || root;
  const selected = nodeMap.get(currentNode.id) || root;
  selectTopic(selected);
});
