const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const starLayerConfig = [
    { speed: 0.5, count: 300 },
    { speed: 1.0, count: 400 },
    { speed: 1.5, count: 300 },
];

const stars = [];
const TWO_PI = Math.PI * 2;

class Star {
    constructor(layerIndex, config) {
        this.layerIndex = layerIndex;
        this.speed = config.speed;
        this.reset(true);
    }

    reset(isInitial = false) {
        const width = canvas.width;
        const height = canvas.height;
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = isInitial ? Math.random() * width : width;
        this.size = Math.random() + 0.1;
        this.opacity = 0;
    }

    update(dt) {
        this.z -= this.speed;
        if (this.z <= 0.1) {
            this.reset();
        }

        const width = canvas.width;
        const height = canvas.height;
        const scale = width / Math.max(0.01, this.z);

        this.px = this.x * scale + width / 2;
        this.py = this.y * scale + height / 2;

        this.opacity = Math.min(1, this.opacity + dt * 2);
    }

    draw() {
        const scale = canvas.width / Math.max(0.01, this.z);
        const size = this.size * scale;

        ctx.beginPath();
        ctx.arc(this.px, this.py, size, 0, TWO_PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function createStars() {
    stars.length = 0;
    starLayerConfig.forEach((config, index) => {
        for (let i = 0; i < config.count; i++) {
            stars.push(new Star(index, config));
        }
    });
}

createStars();

function animate(dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        star.update(dt);
        star.draw();
    }
}

let lastTime = performance.now();
function loop(now) {
    const dt = (now - lastTime) / 1000; // seconds
    lastTime = now;
    animate(dt);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener("resize", () => {
    resizeCanvas();
    createStars();
});