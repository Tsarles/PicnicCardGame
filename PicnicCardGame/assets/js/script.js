let cards = [
    "Ask a Question",
    "What was your first impression of me?",
    "What was the moment you knew you liked me?",
    "What's the funniest thing that's happened to us as a couple?",
    "What's a small moment with me that you cherish?",
    "What's something I did that made you feel special?",
    "When do you feel most loved by me?",
    "What's something I do that makes you feel appreciated?",
    "What makes you feel safe in our relationship?",
    "What's something that I do that brings you joy?",
    "What's something new you'd like us to try together?",
    "Where would you like to travel with me someday?",
    "What's a goal you'd like us to work toward together?",
    "What are you looking forward to experiencing with me?",
    "If we were characters in a movie, what movie would it be?",
    "What fictional couple do you think we're most like?",
    "If we had a theme song, what would it be?",
    "What value is most important to you in our relationship?",
    "How have I helped you grow as a person?",
    "What do you think is our greatest strength as a couple?"
];

const gifPaths = [
    "/assets/gif/CatsChibiGIF.gif",
    "/assets/gif/FrogVibingGIF.gif",
    "/assets/gif/FunLoveGIF.gif",
    "/assets/gif/HelloKittyPinkGIF.gif",
    "/assets/gif/morningGIF.gif"
];

let currentIndex = 0;
let currentGifIndex = 0;

const card = document.getElementById('card');
const cardContent = document.getElementById('cardContent');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const editToggleBtn = document.getElementById('editToggleBtn');
const editArea = document.getElementById('editArea');
const newCardText = document.getElementById('newCardText');
const addCardBtn = document.getElementById('addCardBtn');
const cardList = document.getElementById('cardList');
const currentGif = document.getElementById('currentGif');
const footerDate = document.getElementById('footerDate');

function updateFooterDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    footerDate.textContent = now.toLocaleDateString(undefined, options);
}

function changeGif() {
    currentGifIndex = Math.floor(Math.random() * gifPaths.length);
    currentGif.src = gifPaths[currentGifIndex];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initCards() {
    cards = shuffleArray([...cards]);
    currentIndex = 0;
    updateCardContent();
    card.classList.remove('flipped');
    changeGif();
    saveCardsToStorage();
}

function updateCardContent() {
    cardContent.textContent = cards[currentIndex];
}

function saveCardsToStorage() {
    localStorage.setItem('connectionCards', JSON.stringify(cards));
}

function loadCardsFromStorage() {
    const savedCards = localStorage.getItem('connectionCards');
    if (savedCards) {
        cards = JSON.parse(savedCards);
    }
}

function renderCardList() {
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-list-item';
        
        const cardText = document.createElement('div');
        cardText.textContent = card;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => {
            deleteCard(index);
        });
        
        cardItem.appendChild(cardText);
        cardItem.appendChild(deleteBtn);
        cardList.appendChild(cardItem);
    });
}
function deleteCard(index) {
    cards.splice(index, 1);
    renderCardList();
    saveCardsToStorage();
    
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }
    
    updateCardContent();
}

card.addEventListener('click', function() {
    this.classList.toggle('flipped');
});

nextBtn.addEventListener('click', function() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCardContent();
    card.classList.remove('flipped');
    changeGif();
});

shuffleBtn.addEventListener('click', function() {
    initCards();
});

editToggleBtn.addEventListener('click', function() {
    editArea.classList.toggle('hide');
    if (!editArea.classList.contains('hide')) {
        renderCardList();
    }
});

addCardBtn.addEventListener('click', function() {
    const newCard = newCardText.value.trim();
    if (newCard) {
        cards.push(newCard);
        newCardText.value = '';
        renderCardList();
        saveCardsToStorage();
    }
});

function animateHearts() {
    const hearts = document.querySelector('.footer-hearts');
    hearts.style.opacity = 0.7;
    setTimeout(() => {
        hearts.style.opacity = 1;
    }, 1000);
}

setInterval(animateHearts, 2000);

loadCardsFromStorage();
initCards();
updateFooterDate();