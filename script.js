// Wait for page to load
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const container = document.getElementById('projects');
  let projectFiles = [];

  // Load project list from index.txt
  fetch('projects/index.txt')
    .then(res => res.text())
    .then(data => {
      projectFiles = data.trim().split('\n');
      showProjects(projectFiles);
    })
    .catch(err => {
      container.innerHTML = '<p>Error loading projects.</p>';
      console.error('Error:', err);
    });

  // Show filtered projects
  function showProjects(files) {
    container.innerHTML = '';
    files.forEach(file => {
      const name = file.replace('.txt', '');

      const item = document.createElement('div');
      item.className = 'project-item';

      item.innerHTML = `
        <span class="project-name">${name}</span>
        <a href="projects/${file}" download class="download-btn">⬇️ Download</a>
      `;

      container.appendChild(item);
    });
  }

  // Filter on search input
  searchInput.addEventListener('input', function () {
    const value = this.value.toLowerCase();
    const filtered = projectFiles.filter(file => file.toLowerCase().includes(value));
    showProjects(filtered);
  });
});
