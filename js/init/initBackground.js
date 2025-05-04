import { startStarfield } from '../backgrounds/space.js'; // Choose background here

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("background");
    startStarfield(canvas);
});
