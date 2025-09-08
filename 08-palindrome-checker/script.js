const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

function isPalindrome(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    return cleanStr === cleanStr.split('').reverse().join('');
}

function checkPalindrome() {
    const inputValue = textInput.value;

    if (inputValue === '') {
        alert('Please input a value');
        return;
    }

    const palindromeResult = isPalindrome(inputValue);

    if (palindromeResult) {
        result.textContent = `${inputValue} is a palindrome`;
        result.className = 'result-palindrome result-show';
    } else {
        result.textContent = `${inputValue} is not a palindrome`;
        result.className = 'result-not-palindrome result-show';
    }
}

checkBtn.addEventListener('click', checkPalindrome);

textInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPalindrome();
    }
});

window.addEventListener('load', function () {
    textInput.focus();
});