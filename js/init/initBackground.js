import { startStarfield } from '../backgrounds/space.js';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("background");
    startStarfield(canvas);
});
