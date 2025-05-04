import { startHeaderDissolveEffect } from "../effects/headerDissolve.js";

document.addEventListener("DOMContentLoaded", () => {
    const dissolveTextElement = document.getElementById("header-title");
    const asciiCharacters =
        "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    const colors = [
        "#08f7fe", "#00f0ff", "#00e5ff", "#00d2ff", "#00c3ff",
        "#ff2d95", "#ff00c8", "#ff4da6", "#ff66cc", "#ff9ff3",
        "#f368e0", "#de5dff", "#c04fff", "#a042f5", "#7d5fff",
        "#5f27cd", "#7a00ff", "#a100ff", "#c300ff", "#ff66ff",
        "#f5d300", "#fff700", "#ffff00", "#ffea00", "#cfff04",
        "#00ff9f", "#39ff14", "#1dd1a1", "#00d2d3", "#00ffdd",
        "#ff9966", "#ff6f61", "#ff3131", "#ee5253", "#ff003c",
        "#2e86de", "#0066ff", "#0033ff", "#341f97", "#1a1aff"
    ];


    startHeaderDissolveEffect(dissolveTextElement, asciiCharacters, colors);
});

document.querySelectorAll('.header-links a').forEach(link => {
    link.addEventListener('click', () => {
        link.blur();
    });
});