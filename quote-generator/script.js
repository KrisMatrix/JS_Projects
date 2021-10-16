const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show new quote
function newQuote() {
  show_loading_spinner();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author is null, then set to unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  }
  else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set quote and hide loader
  quoteText.textContent = quote.text;
  hide_loading_spinner();
}

// get quotes from api
async function getQuotes() {
  show_loading_spinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(error) {
    // catch error here
    getQuotes();  //potential problem of infinite loop
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');  //_blank will open twitter in a new tab
}

// Event listener 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

function show_loading_spinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hide_loading_spinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;

}

//on Load
getQuotes();
