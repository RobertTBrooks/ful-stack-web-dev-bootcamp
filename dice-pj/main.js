document.addEventListener("DOMContentLoaded", () => {

    const winner = document.getElementById('winner');

    const diceImage1 = document.querySelector('.img1');
    const diceImage2 = document.querySelector('.img2');

    const player1text = document.getElementById('p1');
    const player2text = document.getElementById('p2');

    const rerollBtn = document.getElementById('reroll');


    rerollBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const player1Roll = Math.floor(Math.random() * 6) + 1;
        const player2Roll = Math.floor(Math.random() * 6) + 1;

        player1text.textContent = `Player One: ${player1Roll}`;
        player2text.textContent = `Player Two: ${player2Roll}`;

        diceImage1.setAttribute('src', `./images/dice${player1Roll}.png`);
        diceImage2.setAttribute('src', `./images/dice${player2Roll}.png`);

        if (player1Roll > player2Roll){
            winner.textContent = `The Winner is Player One!`;
        }
        else if ( player1Roll === player2Roll) {
            winner.textContent = `It's A Draww!!!!`;
        }
        else {
            winner.textContent = `The Winner is Player Two!`;
        }

    });

});