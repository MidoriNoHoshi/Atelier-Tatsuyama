const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const numberOfParticles = 90;

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x - this.radius > canvas.width) this.x = -this.radius;
    if (this.x + this.radius < 0) this.x = canvas.width + this.radius;
    if (this.y - this.radius > canvas.height) this.y = -this.radius;
    if (this.y + this.radius < 0) this.y = canvas.height + this.radius;

    this.draw();
  }
}

const slider = document.getElementById("particleSlider");
const countDisplay = document.getElementById("particleCountDisplay");

function updateParticleCount(targetCount) {
  const currentCount = particles.length;

  if (targetCount > currentCount) {
    for (let i = 0; i < targetCount - currentCount; i++) {
      const radius = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      };
      const color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      particles.push(new Particle(x, y, radius, color, velocity));
    }
  } else if (targetCount < currentCount) {
    particles.splice(targetCount, currentCount - targetCount);
  }
}

slider.addEventListener("input", (e) => {
  const newCount = parseInt(e.target.value, 10);
  countDisplay.textContent = newCount;
  updateParticleCount(newCount);
});

function initParticles() {
  particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const radius = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    };
    const color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

initParticles();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

animate();
