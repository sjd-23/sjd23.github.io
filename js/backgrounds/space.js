export function startStarfield(canvas) {
    const ctx = canvas.getContext("2d");
    const TWO_PI = Math.PI * 2;

    const config = {
        layers: [
            { speed: 0.15, count: 950 },
            { speed: 1.0, count: 1500 },
            { speed: 1.75, count: 450 },
        ],
        colors: [
            { color: "#aabfff", weight: 3 },
            { color: "#cad7ff", weight: 7 },
            { color: "#f8f7ff", weight: 15 },
            { color: "#fff4ea", weight: 20 },
            { color: "#ffd2a1", weight: 30 },
            { color: "#ffcccb", weight: 25 }
        ]
    };

    const stars = [];

    class Star {
        constructor(layer) {
            this.speed = layer.speed;
            this.color = getWeightedRandomColor(config.colors);
            this.size = Math.random() + 0.1;
            this.reset(true);
        }

        reset() {
            const w = canvas.width;
            const h = canvas.height;
            this.x = Math.random() * w - w / 2;
            this.y = Math.random() * h - h / 2;
            this.z = Math.random() * canvas.width;
            this.opacity = 0;
        }

        update(dt) {
            this.z -= this.speed;
            if (this.z <= 0.1) this.reset();
            this.opacity = Math.min(1, this.opacity + dt * 2);
            this.updateScreenPosition();
        }

        updateScreenPosition() {
            const scale = getScale(this.z);
            this.px = this.x * scale + canvas.width / 2;
            this.py = this.y * scale + canvas.height / 2;
        }

        draw() {
            const scale = getScale(this.z);
            const size = Math.min(this.size * scale, 2);
            const glowSize = size * 0.5;
            const glowColor = hexToRGBA(this.color, this.opacity * 0.3);
            const coreColor = hexToRGBA(this.color, this.opacity);

            ctx.beginPath();
            ctx.arc(this.px, this.py, glowSize, 0, TWO_PI);
            ctx.fillStyle = glowColor;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = glowSize * 1.5;
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(this.px, this.py, size, 0, TWO_PI);
            ctx.fillStyle = coreColor;
            ctx.fill();
        }
    }

    const BASE_WIDTH = 1920;
    function getScale(z) {
        return BASE_WIDTH / Math.max(0.01, z);
    }

    function hexToRGBA(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    function getWeightedRandomColor(spectrum) {
        const total = spectrum.reduce((sum, c) => sum + c.weight, 0);
        let rand = Math.random() * total;
        for (const { color, weight } of spectrum) {
            if (rand < weight) return color;
            rand -= weight;
        }
        return spectrum[spectrum.length - 1].color;
    }

    function createStars() {
        stars.length = 0;
        const screenArea = canvas.width * canvas.height;
        const baseArea = 1920 * 1080;
        const scaleFactor = screenArea / baseArea;

        config.layers.forEach(layer => {
            const scaledCount = Math.round(layer.count * scaleFactor);
            for (let i = 0; i < scaledCount; i++) {
                stars.push(new Star(layer));
            }
        });
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars.forEach(star => star.updateScreenPosition());
    }

    function animate(dt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const star of stars) {
            star.update(dt);
            star.draw();
        }
    }

    resizeCanvas();
    createStars();

    let lastTime = performance.now();
    function loop(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;
        animate(dt);
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    window.addEventListener("resize", resizeCanvas);
}