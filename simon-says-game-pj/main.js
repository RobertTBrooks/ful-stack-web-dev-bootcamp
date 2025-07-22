document.addEventListener("DOMContentLoaded", () => {
    const buttons = Array.from(document.querySelectorAll('.btn'));
    const gameState = document.querySelector('#game-state');
    const redSound = new Audio('./sounds/red.mp3');
    const blueSound = new Audio('./sounds/blue.mp3');
    const greenSound = new Audio('./sounds/green.mp3');
    const yellowSound = new Audio('./sounds/yellow.mp3');
    const wrongSound = new Audio('./sounds/wrong.mp3');

    const soundObj = {
        'red' : redSound,
        'blue' : blueSound,
        'green' : greenSound,
        'yellow' : yellowSound,
        'wrong' : wrongSound,
    }
    let rngList = [];
    let playerInput = [];
    let loops = 1;
    let gameInProgress = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function flashButton(btn) {
        btn.classList.add('pressed');
        soundObj[btn.id].play();
        await sleep(500);
        btn.classList.remove('pressed');
        await sleep(200);
    }

    async function playPattern(pattern) {
        for (const btn of pattern) {
            await flashButton(btn);
        }
    }

    function nextInPattern(buttons) {
        let index = Math.floor(Math.random() * buttons.length);
        return buttons[index];
    }

    async function GameStart() {
        gameState.textContent = "Game Started! Good Luck!"
        gameInProgress = true;
        rngList = [];
        playerInput = [];
        for (let i = 0; i < loops; i++) {
            rngList.push(nextInPattern(buttons));
        }

        console.log("Pattern:", rngList.map(b => b.id));
        await playPattern(rngList);
        playerInput = [];
    }

    function handlePlayerClick(btn) {
        if (!gameInProgress) return;
        const expected = rngList[playerInput.length];
        playerInput.push(btn);

        flashButton(btn);

        if (btn !== expected) {
            gameState.textContent = "Wrong! Game Over.";
            soundObj['wrong'].play();
            gameInProgress = false;
            return;
        }

        if (playerInput.length === rngList.length) {
            gameState.textContent = "Correct! Next round...";
            loops++;
            setTimeout(() => GameStart(), 1000);
        }
    }

    // Add event listeners once
    buttons.forEach(btn => {
        btn.addEventListener('click', () => handlePlayerClick(btn));
    });

    // Start on key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 's' && !gameInProgress) {
            loops = 1;
            GameStart();
        }
    });
});
