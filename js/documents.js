document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("documentGrid");
  if (!grid) return;

  const docs = mockData.documentLibrary || [];
  grid.innerHTML = docs
    .map(
      (doc) => `
        <article class="document-card card">
          <div class="document-card-header">
            <div class="pdf-icon"><i class="fas fa-file-pdf"></i></div>
            <button class="icon-button" aria-label="More actions">
              <i class="fas fa-ellipsis-vertical"></i>
            </button>
          </div>

          <div class="document-card-body">
            <h3>${doc.name}</h3>
            <div class="meta-row text-secondary">
              <span><i class="fas fa-file-lines"></i> ${doc.pages} pages</span>
              <span><i class="fas fa-calendar-alt"></i> ${doc.uploadDate}</span>
            </div>

            <div class="doc-progress">
              <div class="progress-meta">
                <span>Progress</span>
                <strong>${doc.progress}%</strong>
              </div>
              <div class="progress-bg"><div class="progress-fill" style="width: ${doc.progress}%"></div></div>
            </div>

            <div class="doc-tags">
              <span>${doc.topics} Topics</span>
              <span>${doc.size}</span>
            </div>
          </div>

          <div class="document-card-footer">
            <button class="btn-primary" onclick="window.location.href='dashboard.html'">Continue</button>
          </div>
        </article>
      `
    )
    .join("");

  const uploadBtn = document.getElementById("uploadNewDocumentBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => window.location.href = "index.html");
  }
});
