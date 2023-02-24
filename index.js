let timerEl = document.getElementById('timer');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let quoteInputEl = document.getElementById('quoteInput');
let resultEl = document.getElementById('result');
let submitBtnEl = document.getElementById('submitBtn');
let resetBtnEl = document.getElementById('resetBtn');
let counter = 0;
let quoteText;
let spinnerEl = document.getElementById('spinner');

function getQuote() {
    spinnerEl.classList.remove('d-none');
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            quoteDisplayEl.textContent = jsonData.content;
            spinnerEl.classList.add('d-none');
            quoteText = jsonData.content;
        });
}
getQuote();
let timeCounterEl;

function timerStart() {
    timeCounterEl = setInterval(function() {
        timerEl.textContent = counter + " seconds";
        counter++;
    }, 1000);
}
timerStart();

submitBtnEl.addEventListener('click', function() {
    if (quoteInputEl.value === quoteText) {
        clearInterval(timeCounterEl);
        resultEl.textContent = "You typed in " + (counter - 1) + " seconds";


    } else {
        resultEl.textContent = "You typed Wrong";
    }
});

resetBtnEl.addEventListener('click', function() {
    resultEl.textContent = "";
    quoteDisplayEl.textContent = "";
    counter = 0;
    quoteInputEl.value = "";
    getQuote();
    clearInterval(timeCounterEl);
    timerStart();
})
