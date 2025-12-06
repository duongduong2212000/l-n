const envelopeContainer = document.getElementById("envelope-container");
const playAgainBtn = document.getElementById("play-again");
const playMusicBtn = document.getElementById("play-music");
const bgMusic = document.getElementById("bg-music");
const openSound = document.getElementById("open-sound");

// Tỉ lệ
const prizes = [
    { text: "1000 Naira", chance: 0.10 },
    { text: "2500 Naira", chance: 0.05 },
    { text: "Hẹn lần sau!", chance: 0.10 },
    { text: "500 Naira", chance: 0.25 },
    { text: "800 Naira", chance: 0.25 },
    { text: "700 Naira", chance: 0.25 }
];

function getRandomPrize() {
    const r = Math.random();
    let cumulative = 0;

    for (let p of prizes) {
        cumulative += p.chance;
        if (r < cumulative) return p.text;
    }
    return "Hẹn lần sau!";
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderEnvelopes() {
    envelopeContainer.innerHTML = "";
    const numbers = shuffle([1, 2, 3, 4, 5, 6]);

    numbers.forEach(num => {
        const div = document.createElement("div");
        div.className = "envelope";
        div.textContent = num;

        div.onclick = () => {
            if (div.classList.contains("opened")) return;

            // play sound
            openSound.play();

            // animation
            div.classList.add("opened");

            setTimeout(() => {
                div.textContent = getRandomPrize();
            }, 300);
        };

        envelopeContainer.appendChild(div);
    });
}

playAgainBtn.onclick = () => {
    renderEnvelopes();
};

playMusicBtn.onclick = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        playMusicBtn.textContent = "Tắt Nhạc";
    } else {
        bgMusic.pause();
        playMusicBtn.textContent = "Phát Nhạc";
    }
};

renderEnvelopes();

