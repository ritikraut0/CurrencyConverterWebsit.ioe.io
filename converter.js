const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultText = document.getElementById("resultText");

// Fetch a list of currencies and populate the dropdowns

fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      const option2 = option1.cloneNode(true);
      fromCurrencySelect.appendChild(option1);
      toCurrencySelect.appendChild(option2);
    });
  });

//Event Listener for conversion

convertBtn.addEventListener("click", () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultText.textContent = "Please enter a valid number. ";
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const conversionRate = data.rates[toCurrency];
      if (conversionRate) {
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        resultText.textContent = `Currency conversion not available. `;
      }
    })
    .catch((error) => {
      console.error("Error fetching conversion rates; ", error);
      resultText.textContent =
        "Error fetching conversion rates. Please try again later. ";
    });
});
