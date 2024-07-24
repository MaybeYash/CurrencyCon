const apiKey = 'dc4767ce9fde33d6d9ddf3ab';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

const currency1 = document.getElementById('currency1');
const currency2 = document.getElementById('currency2');
const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');

let rates = {};

async function getRates() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    rates = data.conversion_rates;
    populateCurrencyOptions();
}

function populateCurrencyOptions() {
    const currencies = Object.keys(rates);
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        option2.value = currency;
        option2.textContent = currency;
        currency1.appendChild(option1);
        currency2.appendChild(option2);
    });
}

function convert() {
    const fromCurrency = currency1.value;
    const toCurrency = currency2.value;
    const fromAmount = parseFloat(amount1.value);

    if (isNaN(fromAmount)) return;

    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const toAmount = fromAmount * conversionRate;

    amount2.value = toAmount.toFixed(2);
}

currency1.addEventListener('change', convert);
currency2.addEventListener('change', convert);
amount1.addEventListener('input', convert);
amount2.addEventListener('input', () => {
    const fromCurrency = currency2.value;
    const toCurrency = currency1.value;
    const fromAmount = parseFloat(amount2.value);

    if (isNaN(fromAmount)) return;

    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const toAmount = fromAmount * conversionRate;

    amount1.value = toAmount.toFixed(2);
});

getRates();
