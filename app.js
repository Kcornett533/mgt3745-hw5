const API = "https://mgt3745-hw4.kcornett533.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("manifestForm");
  const entriesContainer = document.getElementById("entriesContainer");
  const statusBadge = document.getElementById("statusBadge");

  // Load initial entries from Cloudflare D1
  fetchEntries();

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const pipelineName = document.getElementById("pipelineName").value.trim();
      const executionParams = document.getElementById("executionParams").value.trim();
      const fileSignature = document.getElementById("fileSignature").value.trim();
      const notes = document.getElementById("notes").value.trim();

      // Client-side EARS 64-char hex validation rule
      const hex64Regex = /^[a-fA-F0-9]{64}$/;
      if (!hex64Regex.test(fileSignature)) {
        showStatus("Error: File signature must be a valid 64-character hexadecimal SHA-256 string.", true);
        return;
      }

      const payload = {
        pipelineName,
        executionParams,
        fileSignature,
        notes
      };

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
      const data = await res.json();
      renderEntries(data);
    } catch (err) {
      showStatus(`Error loading records: ${err.message}`, true);
    }
  }

  function renderEntries(entries) {
    if (!entriesContainer) return;
    entriesContainer.textContent = ""; // Clear existing elements safely

    if (!Array.isArray(entries) || entries.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-msg";
      emptyMsg.textContent = "No provenance entries logged yet.";
      entriesContainer.appendChild(emptyMsg);
      return;
    }

    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "card entry-card";

      // Header row
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

      // Meta info (Timestamp & Params)
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

      // File Signature (SHA-256)
      const sigP = document.createElement("p");
      sigP.className = "signature";
      const sigLabel = document.createElement("strong");
      sigLabel.textContent = "SHA-256 Hash: ";
      const sigCode = document.createElement("code");
      sigCode.textContent = entry.fileSignature || "N/A";
      sigP.appendChild(sigLabel);
      sigP.appendChild(sigCode);
      card.appendChild(sigP);

      // Notes section
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
