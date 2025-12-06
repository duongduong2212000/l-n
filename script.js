const envelopeContainer = document.getElementById("envelope-container");
const playAgainBtn = document.getElementById("play-again");
const playMusicBtn = document.getElementById("play-music");
const bgMusic = document.getElementById("bg-music");
const openSound = document.getElementById("open-sound");

// Prize probability
const prizes = [
    { text: "1000 Naira", chance: 0.10 },
    { text: "2500 Naira", chance: 0.05 },
    { text: "Next Time!", chance: 0.10 },
    { text: "500 Naira", chance: 0.25 },
    { text: "800 Naira", chance: 0.25 },
    { text: "700 Naira", chance: 0.25 }
];

function getRandomPrize() {
    const r = Math.random();
    let sum = 0;

    for (let p of prizes) {
        sum += p.chance;
        if (r < sum) return p.text;
    }
    return "Next Time!";
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderEnvelopes() {
    envelopeContainer.innerHTML = "";
    const numbers = shuffle([1, 2, 3, 4, 5, 6]);

    numbers.forEach(num => {
        const envelope = document.createElement("div");
        envelope.className = "envelope";

        envelope.innerHTML = `
            <div class="envelope-inner">
                <div class="envelope-front">${num}</div>
                <div class="envelope-back"></div>
            </div>
        `;

        envelope.onclick = () => {
            if (envelope.classList.contains("opened")) return;

            openSound.play();

            const prize = getRandomPrize();
            envelope.querySelector(".envelope-back").textContent = prize;

            envelope.classList.add("opened");
        };

        envelopeContainer.appendChild(envelope);
    });
}

playAgainBtn.onclick = () => renderEnvelopes();

playMusicBtn.onclick = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        playMusicBtn.textContent = "Pause Music";
    } else {
        bgMusic.pause();
        playMusicBtn.textContent = "Play Music";
    }
};

renderEnvelopes();
