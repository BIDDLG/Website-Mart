let allFiles = [];

fetch('projects/index.txt')
  .then(res => res.text())
  .then(text => {
    allFiles = text.trim().split('\n');
    showResults('');
  });

function showResults(query) {
  const resultBox = document.getElementById('results');
  resultBox.innerHTML = '';

  allFiles.forEach(file => {
    if (file.toLowerCase().includes(query.toLowerCase())) {
      const card = document.createElement('div');
      card.className = 'card';

      const title = file.charAt(0).toUpperCase() + file.slice(1);

      const rawURL = `https://raw.githubusercontent.com/BIDDLG/Website-Mart/main/projects/${file}.txt`;

      card.innerHTML = `
        <span>${title}</span>
        <a href="#" onclick="shortenAndRedirect('${rawURL}')" title="Download">
          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 441 512.02"><path d="..."/></svg>
        </a>
      `;

      resultBox.appendChild(card);
    }
  });
}

async function shortenAndRedirect(originalUrl) {
  const apiKey = "2469484d258897da1dc9edaf4face6f466301f39";
  const apiUrl = `https://gplinks.in/api?api=${apiKey}&url=${encodeURIComponent(originalUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.shortenedUrl) {
      window.location.href = data.shortenedUrl;
    } else if (data.shortened) {
      window.location.href = data.shortened;
    } else {
      alert("❌ Failed to generate short link.");
    }
  } catch (error) {
    console.error("Shorten Error:", error);
    alert("⚠️ Network error while generating link.");
  }
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  showResults(e.target.value);
});

// Right-click block
document.addEventListener('contextmenu', event => event.preventDefault());

// Long press block
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.setAttribute('draggable', 'false');
    link.addEventListener('touchstart', e => {
      e.preventDefault();
      link.click();
    });
    link.style.userSelect = 'none';
    link.style.webkitUserSelect = 'none';
  });
});
