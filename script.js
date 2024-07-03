const diersoorten = [
    { naam: "hond", hint: "Meest populaire huisdier naast een kat" },
    { naam: "giraf", hint: "Dier met de langste nek" },
    { naam: "wolf", hint: "De hond is aan afstammeling van dit dier" },
    { naam: "beer", hint: "Houdt van honing en zalm" },
    { naam: "duif", hint: "Dit dier werd vroeger gebruikt om post te versturen" },
    { naam: "rat", hint: "Net iets groter dan een muis" },
    { naam: "kameleon", hint: "Reptiel die van kleur kan veranderen" },
    { naam: "konijn", hint: "Dit dier houdt van wortels" }
];

let chosenWord

function randomWord() {
    let randomIndex = Math.floor(Math.random() * diersoorten.length);
    chosenWord = diersoorten[randomIndex].naam;
    let chosenHint = diersoorten[randomIndex].hint;
    console.log("Woord:", chosenWord);
    console.log("Hint:", chosenHint);
    diersoorten.splice(randomIndex, 1); // dit zorgt ervoor dat elke diersoort maar 1 keer voorkomt
    let hint = document.querySelector(".hint")
    hint.textContent = ("Hint: ") + chosenHint
}

randomWord();



let invoer = document.querySelector("input")
const button = document.querySelector("button");
let checken = document.querySelector("h1")
let ishetwoordcorrect = false // hiermee kun je bijhouden of het woord goed is geraden of niet


function raadWoord() {
    if (chosenWord == invoer.value && ishetwoordcorrect == false) {
        checken.textContent = "Correct";
        checken.classList.add("correct");
        checken.classList.remove("fout");
        ishetwoordcorrect = true;
        increaseScore();
        button.textContent = "Volgende";
    } else if (ishetwoordcorrect == true) {
        randomWord();
        ishetwoordcorrect = false;
        checken.textContent = "Raad het dier";
        checken.classList.remove("correct");
        checken.classList.remove("fout");
        invoer.value = "";
        button.textContent = "Volgende";
    } else {
        checken.textContent = "Fout!";
        checken.classList.add("fout");
        checken.classList.remove("correct");
        invoer.value = "";
        resetScore();
        button.textContent = "Controleer";
    }
}

function bijenter (event) {
    console.log(event.which);
    if (event.which == 13) {
        raadWoord()
    }
}
document.addEventListener ("keydown", bijenter);

button.addEventListener("click", raadWoord);

const scoreTeller = document.querySelector("h2")
let score = 0
const overlay = document.querySelector(".overlay")

function updateScore() {
    document.querySelector(".teller").textContent = `${score}/5`;

    if (score === 5) {
        gefeliciteerd()
    }
}

function increaseScore() {
    if (score < 5) {
        score++
        updateScore()

    }
}

function resetScore() {
    score = 0
    updateScore()
}

updateScore()

function gefeliciteerd() { // wanneer de gebruiker alle 5 de woorden heeft geraden krijg je een pop up met gefeliciteerd en de optie om opnieuw te spelen of om het spel te verlaten.
    overlay.classList.remove("hidden");
    document.body.classList.add("blur");
}

function resetGame() {
    randomWord();
    resetScore();
}