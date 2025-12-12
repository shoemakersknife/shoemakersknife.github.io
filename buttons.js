const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';
document.body.appendChild(buttonContainer);

function createButton(url, text) {
  const btn = document.createElement('a');
  btn.href = url;
  btn.target = '_blank'; // open in new tab
  btn.rel = 'noopener noreferrer';
  btn.textContent = text;
  btn.className = 'particle-button'; // optional class for styling
  return btn;
}

// Create GitHub button
const githubButton = createButton('https://github.com/shoemakersknife', 'GitHub');
buttonContainer.appendChild(githubButton);

// Create LinkedIn button
const linkedinButton = createButton('https://www.linkedin.com/in/mijkim/', 'LinkedIn');
buttonContainer.appendChild(linkedinButton);

// Optional: Fade in the container after a delay
buttonContainer.style.opacity = 0;
buttonContainer.style.transition = 'opacity 1s ease';
setTimeout(() => {
  buttonContainer.style.opacity = 1;
}, 2000); // fade in 2 seconds after page load
