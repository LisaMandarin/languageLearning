export function breakSentence(event, inputElem, outputElem) {
    event.preventDefault(); // Stop the button from submitting
    
    const text = inputElem.textContent;
    const regex = /[^.!?]+[.!?]+/g;  //not start with .!? but end with .!?
    const sentences = text.match(regex) || [];

    const trimmedSentences = sentences.map((sentence) => sentence.trim());
    outputElem.innerHTML = trimmedSentences.map(sentence => "➢" + sentence).join('<br>');
}
