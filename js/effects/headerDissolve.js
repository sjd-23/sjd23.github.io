export function startHeaderDissolveEffect(element, asciiCharacters, colors) {
    const finalText = element.dataset.text;
    let iterations = 0;
    const maxIterations = 85;

    const dissolveInterval = setInterval(() => {
        iterations++;
        element.innerHTML = "";

        for (let i = 0; i < finalText.length; i++) {
            let char;
            let color;

            if (Math.random() < iterations / maxIterations) {
                char = finalText[i];
                color = "#f4f4f4";
            } else {
                char = asciiCharacters[Math.floor(Math.random() * asciiCharacters.length)];
                color = colors[Math.floor(Math.random() * colors.length)];
            }

            const span = document.createElement("span");
            span.textContent = char;
            span.style.color = color;
            element.appendChild(span);
        }

        if (iterations >= maxIterations) {
            clearInterval(dissolveInterval);
            startRandomFlickers(element, finalText, asciiCharacters, colors);
        }
    }, 60);
}

function startRandomFlickers(element, finalText, asciiCharacters, colors) {
    for (let i = 0; i < 3; i++) {
        startRandomFlicker(element, finalText, asciiCharacters, colors);
    }
}

function startRandomFlicker(element, finalText, asciiCharacters, colors) {
    const randomInterval = Math.random() * 1000 + 1000;

    setInterval(() => {
        const chars = Array.from(finalText);
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = asciiCharacters[Math.floor(Math.random() * asciiCharacters.length)];

        element.innerHTML = chars
            .map((char, index) =>
                `<span style="color: ${index === randomIndex ? colors[Math.floor(Math.random() * colors.length)] : "#f4f4f4"}">${char}</span>`
            )
            .join("");

        setTimeout(() => {
            chars[randomIndex] = finalText[randomIndex];
            element.innerHTML = chars
                .map((char) => `<span style="color: #f4f4f4">${char}</span>`)
                .join("");
        }, 100);
    }, randomInterval);
}