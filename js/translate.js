import { loading } from "./util";

export async function translateSentence(event, inputElem, outputElem) {
  event.preventDefault(); // Stop the button from submitting

  const htmlContent = inputElem.innerHTML;
  const parts = htmlContent.split('<br>');
  const sentences = [];

  parts.forEach(part => {
    const trimmedPart = part.trim();
    if (trimmedPart) {
      sentences.push(trimmedPart);
    }
  });

  outputElem.textContent = '';
  loading(outputElem, 'translation');

  let resultHtml = '';

  for (let sentence of sentences) {
    resultHtml += await translate(sentence);
  }

  outputElem.innerHTML = resultHtml;
}

async function translate(sentence) {
  // ----- api information -----
  const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=zh-Hant&api-version=3.0&profanityAction=NoAction&textType=plain';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1b58f68877msh09e7f1c9031ff15p14b078jsnbd682f41b858',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: JSON.stringify([
      {
        Text: sentence
      }
    ])
  };
  // ----- end of api information -----

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`);
    }
    const result = await response.json();
  
    return `<span class="original-text">${sentence}</span><br>` + 
           `<span class="translated-text">${result[0].translations[0].text}</span><hr>`;
  
  } catch (error) {
    console.error("Translation error: ", error);
    return `<span class="translate-error">Error translating sentence: ${sentence}</span><br><hr>`;
  }
}