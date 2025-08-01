fetch('projects/index.txt')
  .then(res => res.text())
  .then(data => {
    const files = data.trim().split('\n');
    const container = document.getElementById('projects');

    files.forEach(file => {
      const name = file.replace('.txt', '');
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${name}</h3>
        <p>${name} project download</p>
        <a href="projects/${file}" download>⬇️ Download</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('projects').innerHTML = '<p>Error loading projects.</p>';
    console.error('Error:', err);
  });
