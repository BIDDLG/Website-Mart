function openModal(title, frameURL, desc, downloadLink) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("projectFrame").src = frameURL;
  document.getElementById("projectDesc").innerText = desc;
  document.getElementById("downloadBtn").href = downloadLink;
  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("projectFrame").src = "";
}
