let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById('cash');
const changeDueElement = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

const currencyValues = {
    'PENNY': 1,
    'NICKEL': 5,
    'DIME': 10,
    'QUARTER': 25,
    'ONE': 100,
    'FIVE': 500,
    'TEN': 1000,
    'TWENTY': 2000,
    'ONE HUNDRED': 10000
};

function checkCashRegister(price, cash, cid) {
    const changeDueCents = Math.round((cash - price) * 100);
    const cidCents = cid.map(([name, amount]) => [name, Math.round(amount * 100)]);

    const totalCashInDrawer = cidCents.reduce((total, [, amount]) => total + amount, 0);

    if (totalCashInDrawer < changeDueCents) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    if (totalCashInDrawer === changeDueCents) {
        return { status: 'CLOSED', change: cidCents.filter(([, amount]) => amount > 0) };
    }

    const change = [];
    let remainingChange = changeDueCents;

    for (let i = cidCents.length - 1; i >= 0; i--) {
        const [denomination, availableAmount] = cidCents[i];
        const denominationValue = currencyValues[denomination];

        if (remainingChange >= denominationValue && availableAmount > 0) {
            const amountToUse = Math.min(availableAmount, Math.floor(remainingChange / denominationValue) * denominationValue);

            if (amountToUse > 0) {
                change.push([denomination, amountToUse]);
                remainingChange -= amountToUse;
            }
        }
    }

    if (remainingChange > 0) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    return { status: 'OPEN', change: change };
}

function formatChange(changeArray) {
    return changeArray.map(([denomination, amountCents]) => {
        const amountDollars = (amountCents / 100).toFixed(2);
        return `${denomination}: $${amountDollars}`;
    }).join(' ');
}

function handlePurchase() {
    const cash = parseFloat(cashInput.value);

    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
        return;
    }

    if (cash === price) {
        changeDueElement.textContent = 'No change due - customer paid with exact cash';
        changeDueElement.className = 'change-exact';
        return;
    }

    const result = checkCashRegister(price, cash, cid);

    let displayText = `Status: ${result.status}`;
    let className = '';

    if (result.status === 'OPEN') {
        if (result.change.length > 0) {
            displayText += ' ' + formatChange(result.change);
        }
        className = 'change-open';
    } else if (result.status === 'CLOSED') {
        if (result.change.length > 0) {
            displayText += ' ' + formatChange(result.change);
        }
        className = 'change-closed';
    } else if (result.status === 'INSUFFICIENT_FUNDS') {
        className = 'change-insufficient';
    }

    changeDueElement.textContent = displayText;
    changeDueElement.className = className;
}

purchaseBtn.addEventListener('click', handlePurchase);

cashInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handlePurchase();
    }
});

window.addEventListener('load', function () {
    cashInput.focus();
});