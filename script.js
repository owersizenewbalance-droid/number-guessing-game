// O'yin o'zgaruvchilari
let secretNumber;
let attempts = 0;
let guesses = [];
let bestScore = localStorage.getItem('bestScore') || null;

// DOM elementlari
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const hint = document.getElementById('hint');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('bestScore');
const guessesText = document.getElementById('guessesText');

// O'yinni boshlash
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guesses = [];
    guessInput.value = '';
    hint.textContent = '💡 Raqam o'ylandi! Boshlang...';
    hint.className = 'hint';
    attemptsDisplay.textContent = '0';
    guessesText.textContent = 'Hali hech nima yo'q';
    guessInput.focus();
    updateBestScore();
}

// Raqamni tekshirish
function checkGuess() {
    const guess = parseInt(guessInput.value);

    // Validatsiya
    if (isNaN(guess)) {
        hint.textContent = '⚠️ Iltimos, raqam kiriting!';
        hint.className = 'hint';
        return;
    }

    if (guess < 1 || guess > 100) {
        hint.textContent = '⚠️ 1-100 orasida raqam kiriting!';
        hint.className = 'hint';
        return;
    }

    if (guesses.includes(guess)) {
        hint.textContent = `🔄 Siz allaqachon ${guess} ni taxmin qilgansiz!`;
        hint.className = 'hint';
        return;
    }

    // Urinishni qo'shish
    attempts++;
    guesses.push(guess);
    attemptsDisplay.textContent = attempts;

    // Natijani tekshirish
    if (guess === secretNumber) {
        winGame();
    } else if (guess < secretNumber) {
        hint.textContent = `📈 Juda KICHIK! Yana urinib ko'ring!`;
        hint.className = 'hint wrong-low';
    } else {
        hint.textContent = `📉 Juda KATTA! Yana urinib ko'ring!`;
        hint.className = 'hint wrong-high';
    }

    // Taxminlarni ko'rsatish
    updateGuessesDisplay();
    guessInput.value = '';
    guessInput.focus();
}

// O'yin g'alaba
function winGame() {
    hint.textContent = `🎉 TO'G'RI! Raqam: ${secretNumber}`;
    hint.className = 'hint correct';
    guessBtn.disabled = true;
    guessInput.disabled = true;

    // Eng yaxshi natijani saqlash
    if (bestScore === null || attempts < parseInt(bestScore)) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        hint.textContent += ' 🏆 Yangi rekord!';
    }

    updateBestScore();
}

// Eng yaxshi natijani yangilash
function updateBestScore() {
    if (bestScore) {
        bestScoreDisplay.textContent = bestScore + ' urinish';
    } else {
        bestScoreDisplay.textContent = '-';
    }
}

// Taxminlarni ko'rsatish
function updateGuessesDisplay() {
    if (guesses.length === 0) {
        guessesText.textContent = 'Hali hech nima yo'q';
    } else {
        guessesText.textContent = guesses.join(', ');
    }
}

// Yangi o'yin
function newGame() {
    guessBtn.disabled = false;
    guessInput.disabled = false;
    initGame();
}

// Event listenerlar
guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', newGame);

// Enter tugmasi bilan tekshirish
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// O'yinni boshlash
window.addEventListener('load', () => {
    initGame();
});
