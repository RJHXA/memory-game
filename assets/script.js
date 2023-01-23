const cards = document.querySelectorAll('.card');
const score = document.getElementById('counter');
let cardFlipped = false;
let firstCard, secondCard;
let lockJogo = false;
let currentscore = 0;

function flipCard() {
    if(lockJogo) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    cardFlipped = false;
    checkForMatch();
}

function checkForMatch() {
    console.log(firstCard.dataset.card);
    console.log(secondCard.dataset.card);
    if(firstCard.dataset.card === secondCard.dataset.card) {
        console.log("YES");
        disableCards();
        addscore();
        return;
    }

    unflipCards();
}

function addscore() {
    currentscore++;
    score.innerHTML = currentscore;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetJogo();
}

function unflipCards() {
    lockJogo = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetJogo();
    }, 1500);
}

function resetJogo() {
    [cardFlipped, lockJogo] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function randomize() {
    cards.forEach((card) => {
        let ranndomPosition = Math.floor(Math.random() * 12);
        card.style.order = ranndomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})