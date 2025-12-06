const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Firework() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(50, canvas.height / 2);
    this.speed = random(4, 6);
    this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
}

Firework.prototype.update = function () {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
        explode(this.x, this.y, this.color);
        return false;
    }
    drawCircle(this.x, this.y, 3, this.color);
    return true;
};

function explode(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y, color));
    }
}

let particles = [];

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.dx = random(-3, 3);
    this.dy = random(-3, 3);
    this.alpha = 1;
    this.color = color;
}

Particle.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.02;

    drawCircle(this.x, this.y, 3, this.color, this.alpha);
    return this.alpha > 0;
};

function drawCircle(x, y, size, color, alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) fireworks.push(new Firework());

    fireworks = fireworks.filter(fw => fw.update());
    particles = particles.filter(p => p.update());

    requestAnimationFrame(loop);
}

loop();
