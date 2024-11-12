let count = 0;
let streak = 0;
let lastCompletionTime = 0;
const counterDisplay = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const resetButton = document.getElementById('reset');
const dhikrSelect = document.getElementById('dhikr');
const targetInput = document.getElementById('target');
const progressBar = document.getElementById('progressBar');
const currentDhikr = document.getElementById('currentDhikr');
const streakDisplay = document.getElementById('streakCount');

function updateProgress() {
    const target = parseInt(targetInput.value);
    const progress = (count / target) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function updateCurrentDhikr() {
    currentDhikr.textContent = dhikrSelect.value;
}

function updateStreak() {
    const now = Date.now();
    if (now - lastCompletionTime < 24 * 60 * 60 * 1000) {
        streak++;
    } else {
        streak = 1;
    }
    lastCompletionTime = now;
    streakDisplay.textContent = `التكرار المتتالي: ${streak}`;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCompletionTime', lastCompletionTime);
}

incrementButton.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
    updateProgress();
    if (count === parseInt(targetInput.value)) {
        alert(`أحسنت! لقد أكملت ${targetInput.value} من ${dhikrSelect.value}!`);
        updateStreak();
        count = 0;
        counterDisplay.textContent = count;
        updateProgress();
    }
});

resetButton.addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
    updateProgress();
});

dhikrSelect.addEventListener('change', updateCurrentDhikr);
targetInput.addEventListener('change', updateProgress);

// تحميل البيانات المحفوظة
window.addEventListener('load', () => {
    streak = parseInt(localStorage.getItem('streak')) || 0;
    lastCompletionTime = parseInt(localStorage.getItem('lastCompletionTime')) || 0;
    streakDisplay.textContent = `التكرار المتتالي: ${streak}`;
    updateCurrentDhikr();
});

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// إضافة ميزة التسبيح بالنقر على الشاشة أو بضغط مفتاح
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
        incrementButton.click();
    }
});

document.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'INPUT') {
        incrementButton.click();
    }
});