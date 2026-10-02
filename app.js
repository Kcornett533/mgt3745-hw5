const API = "https://mgt3745-hw4.kcornett533.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("manifestForm");
  const entriesContainer = document.getElementById("entriesContainer");
  const statusBadge = document.getElementById("statusBadge");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  let allEntries = [];

  fetchEntries();

  if (searchInput) searchInput.addEventListener("input", filterAndRender);
  if (filterSelect) filterSelect.addEventListener("change", filterAndRender);

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const pipelineName = document.getElementById("pipelineName").value.trim();
      const executionParams = document.getElementById("executionParams").value.trim();
      const fileSignature = document.getElementById("fileSignature").value.trim();
      const notes = document.getElementById("notes").value.trim();

      const hex64Regex = /^[a-fA-F0-9]{64}$/;
      if (!hex64Regex.test(fileSignature)) {
        showStatus("Error: File signature must be a valid 64-character hexadecimal SHA-256 string.", true);
        return;
      }

      const payload = { pipelineName, executionParams, fileSignature, notes };

      try {
        showStatus("Saving entry to Cloudflare D1...", false);
        const res = await fetch(`${API}/entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with status ${res.status}`);
        }

        showStatus("Entry saved successfully!", false);
        form.reset();
        fetchEntries();
      } catch (err) {
        showStatus(`Failed to save entry: ${err.message}`, true);
      }
    });
  }

  async function fetchEntries() {
    try {
      const res = await fetch(`${API}/entries`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      allEntries = await res.json();
      filterAndRender();
    } catch (err) {
      showStatus(`Error loading records: ${err.message}`, true);
    }
  }

  function filterAndRender() {
    if (!Array.isArray(allEntries)) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filter = filterSelect ? filterSelect.value : "all";

    const filtered = allEntries.filter((entry) => {
      const name = (entry.pipelineName || "").toLowerCase();
      const notes = (entry.notes || "").toLowerCase();

      const matchesSearch = name.includes(query) || notes.includes(query);

      let matchesFilter = true;
      if (filter === "has-notes") matchesFilter = Boolean(entry.notes && entry.notes.trim() !== "");
      if (filter === "no-notes") matchesFilter = !entry.notes || entry.notes.trim() === "";

      return matchesSearch && matchesFilter;
    });

    renderEntries(filtered, query !== "" || filter !== "all");
  }

  function renderEntries(entries, isFiltered) {
    if (!entriesContainer) return;
    entriesContainer.textContent = "";

    if (entries.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-msg";
      emptyMsg.textContent = isFiltered
        ? "No matching provenance records found."
        : "No provenance entries logged yet.";
      entriesContainer.appendChild(emptyMsg);
      return;
    }

    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "card entry-card";

      const header = document.createElement("div");
      header.className = "entry-header";

      const title = document.createElement("h3");
      title.textContent = entry.pipelineName || "Unnamed Pipeline";

      const idBadge = document.createElement("span");
      idBadge.className = "badge id-badge";
      idBadge.textContent = entry.id_str || `MAN-${entry.id}`;

      header.appendChild(title);
      header.appendChild(idBadge);
      card.appendChild(header);

      const metaDiv = document.createElement("div");
      metaDiv.className = "entry-meta";

      const timeSpan = document.createElement("span");
      timeSpan.className = "timestamp";
      timeSpan.textContent = `Timestamp: ${entry.timestamp || "N/A"}`;

      const paramsP = document.createElement("p");
      paramsP.className = "params";
      const paramsLabel = document.createElement("strong");
      paramsLabel.textContent = "Parameters: ";
      paramsP.appendChild(paramsLabel);
      paramsP.appendChild(document.createTextNode(entry.executionParams || "None"));

      metaDiv.appendChild(timeSpan);
      metaDiv.appendChild(paramsP);
      card.appendChild(metaDiv);

      const sigP = document.createElement("p");
      sigP.className = "signature";
      const sigLabel = document.createElement("strong");
      sigLabel.textContent = "SHA-256 Hash: ";
      const sigCode = document.createElement("code");
      sigCode.textContent = entry.fileSignature || "N/A";
      sigP.appendChild(sigLabel);
      sigP.appendChild(sigCode);
      card.appendChild(sigP);

      if (entry.notes) {
        const notesP = document.createElement("p");
        notesP.className = "notes";
        const notesLabel = document.createElement("strong");
        notesLabel.textContent = "Notes: ";
        notesP.appendChild(notesLabel);
        notesP.appendChild(document.createTextNode(entry.notes));
        card.appendChild(notesP);
      }

      entriesContainer.appendChild(card);
    });
  }

  function showStatus(message, isError) {
    if (!statusBadge) return;
    statusBadge.textContent = message;
    statusBadge.className = isError ? "status-badge error" : "status-badge success";
    statusBadge.style.display = "block";
  }
});