import { startHeaderDissolveEffect } from "../effects/headerDissolve.js";

document.addEventListener("DOMContentLoaded", () => {
    const dissolveTextElement = document.getElementById("header-title");
    const asciiCharacters = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    const colors = [
        "#F5A9A9", "#F5BCA9", "#F5D0A9", "#F3E2A9", "#F2F5A9", "#E1F5A9",
        "#D0F5A9", "#BCF5A9", "#A9F5A9", "#A9F5BC", "#A9F5D0", "#A9F5E1",
        "#A9F5F2", "#A9E2F3", "#A9D0F5", "#A9BCF5", "#A9A9F5", "#BCA9F5",
        "#D0A9F5", "#E2A9F3", "#F5A9F2", "#F5A9E1", "#F5A9D0", "#F5A9BC"
    ];

    startHeaderDissolveEffect(dissolveTextElement, asciiCharacters, colors);
});