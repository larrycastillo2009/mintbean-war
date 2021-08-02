// import flip from "./node_modules/deck-of-cards/dist/deck"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound, stop
var deck = Deck();
var deck2 = []

for(var i=0;i<26;i++){
    deck2.push(deck.cards[i]);
}for(var i=0;i<26;i++){
    deck.cards.shift(deck.cards[i]);
}

document.addEventListener("click", () => {

    if (stop) {
        startGame(deck,deck2)
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards(deck,deck2)
    }
})

startGame(deck,deck2)
function startGame(deck) {
    var $container = document.getElementById('container')
    var $container2 = document.getElementById('container2')

    deck.mount($container)
    deck.shuffle();

    // var deck2 = []
    //
    // for(var i=0;i<26;i++){
    //     deck2.push(deck.cards[i]);
    // }

    for(var i=0;i<26;i++){
        deck2[i].mount($container2);
    }
    console.log(deck.cards);
    console.log(deck2);

    inRound = false
    stop = false

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""

    updateDeckCount()
}

function flipCards(deck) {
    inRound = true
    deck.flip();

    console.log(deck2[deck2.length-1])
    console.log(deck.cards[deck.cards.length-1])


    updateDeckCount()

    if (deck2[deck2.length-1] > deck[deck.cardslength-1]) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!!"
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = deck.length
    playerDeckElement.innerText = deck2.length
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}