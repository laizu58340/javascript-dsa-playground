const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

function validatePhoneNumber(phoneNumber) {
    // Valid US phone number patterns:
    // 1 555-555-5555
    // 1 (555) 555-5555
    // 1(555)555-5555
    // 1 555 555 5555
    // 5555555555
    // 555-555-5555
    // (555)555-5555

    const validPatterns = [
        /^1 [0-9]{3}-[0-9]{3}-[0-9]{4}$/,           // 1 555-555-5555
        /^1 \([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,       // 1 (555) 555-5555
        /^1\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/,         // 1(555)555-5555
        /^1 [0-9]{3} [0-9]{3} [0-9]{4}$/,           // 1 555 555 5555
        /^[0-9]{10}$/,                              // 5555555555
        /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,             // 555-555-5555
        /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/           // (555)555-5555
    ];

    return validPatterns.some(pattern => pattern.test(phoneNumber));
}

function checkPhoneNumber() {
    const inputValue = userInput.value;

    if (inputValue === '') {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(inputValue);

    if (isValid) {
        resultsDiv.textContent = `Valid US number: ${inputValue}`;
        resultsDiv.className = 'result-valid';
    } else {
        resultsDiv.textContent = `Invalid US number: ${inputValue}`;
        resultsDiv.className = 'result-invalid';
    }
}

function clearResults() {
    resultsDiv.textContent = '';
    resultsDiv.className = '';
}

checkBtn.addEventListener('click', checkPhoneNumber);
clearBtn.addEventListener('click', clearResults);

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPhoneNumber();
    }
});

window.addEventListener('load', function () {
    userInput.focus();
});