const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
];

function convertToRoman(num) {
    let result = '';

    for (let i = 0; i < romanNumerals.length; i++) {
        const { value, numeral } = romanNumerals[i];

        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
}

function convertNumber() {
    const inputValue = numberInput.value;

    if (inputValue === '') {
        output.textContent = 'Please enter a valid number';
        output.className = 'output-error';
        return;
    }

    const number = parseInt(inputValue);

    if (number < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
        output.className = 'output-error';
        return;
    }

    if (number >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999';
        output.className = 'output-error';
        return;
    }

    const romanNumeral = convertToRoman(number);
    output.textContent = romanNumeral;
    output.className = 'output-success';
}

convertBtn.addEventListener('click', convertNumber);

numberInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        convertNumber();
    }
});

window.addEventListener('load', function () {
    numberInput.focus();
});