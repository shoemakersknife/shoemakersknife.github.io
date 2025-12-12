const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nameText = "who is michael kim?";
const roles = ["engineer", "artist", "developer", "producer", "designer", "musician", "hacker", "creator"];
let currentRoleIndex = 0;

let nameParticles = [];
let roleParticles = [];
let transitioning = false;
let showRole = false;

// Get particle positions from text
function getTextPoints(text, fontSize, yOffset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, yOffset);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const points = [];

  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      const alpha = imageData.data[(y * canvas.width + x) * 4 + 3];
      if (alpha > 128) points.push({ x, y });
    }
  }
  return points;
}

// Name particles
function initNameParticles() {
  const points = getTextPoints(nameText, 120, canvas.height / 2 - 50);
  nameParticles = points.map(p => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    tx: p.x,
    ty: p.y,
    angle: Math.random() * Math.PI * 2,
    offsetX: Math.random() * 0.35,
    offsetY: Math.random() * 0.35,
    speed: 0.01 + Math.random() * 0.02
  }));
}

// Role particles
function createRoleParticles(word) {
  const points = getTextPoints(word, 50, canvas.height / 2 + 50);
  return points.map(p => ({
    x: p.x + (Math.random() - 0.5) * 10,
    y: p.y + (Math.random() - 0.5) * 10,
    tx: p.x,
    ty: p.y,
    angle: Math.random() * Math.PI * 2,
    offsetX: Math.random() * 0.1,
    offsetY: Math.random() * 0.1,
    speed: 0.01 + Math.random() * 0.01,
    driftX: Math.random() * 0.2 - 0.1,
    driftY: Math.random() * 0.2 - 0.1,
    opacity: 0
  }));
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw name particles
  nameParticles.forEach(p => {
    p.angle += p.speed;
    const ox = Math.sin(p.angle) * p.offsetX;
    const oy = Math.cos(p.angle) * p.offsetY;
    p.x += (p.tx - p.x) * 0.05 + ox;
    p.y += (p.ty - p.y) * 0.05 + oy;
    const size = Math.random() * 2 + 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(p.x, p.y, size, size);
  });

  // Draw role particles
  if (showRole) {
    roleParticles.forEach(p => {
      p.angle += p.speed;
      const fx = Math.sin(p.angle) * p.offsetX + p.driftX;
      const fy = Math.cos(p.angle) * p.offsetY + p.driftY;
      p.x += (p.tx - p.x) * 0.08 + fx;
      p.y += (p.ty - p.y) * 0.08 + fy;

      if (transitioning) {
        p.opacity -= 0.03;
        p.x += (Math.random() - 0.5) * 1.5;
        p.y += (Math.random() - 0.5) * 1.5;
      } else {
        if (p.opacity < 1) p.opacity += 0.02;
      }

      const size = Math.random() * 1.5 + 1;
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, p.opacity)})`;
      ctx.fillRect(p.x, p.y, size, size);
    });
  }

  requestAnimationFrame(animate);
}

// Switch roles
function switchRole() {
  if (!showRole) return;
  transitioning = true;
  setTimeout(() => {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    roleParticles = createRoleParticles(roles[currentRoleIndex]);
    transitioning = false;
  }, 750);
}

// Initialize
initNameParticles();
animate();

// Fade in first role after name forms
setTimeout(() => {
  showRole = true;
  roleParticles = createRoleParticles(roles[currentRoleIndex]);
}, 1500);

// Switch roles every 5 seconds
setInterval(switchRole, 5000);

// Handle resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initNameParticles();
  if (showRole) {
    roleParticles = createRoleParticles(roles[currentRoleIndex]);
  }
});
