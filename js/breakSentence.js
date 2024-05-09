import { qs } from "./util.js";

document.addEventListener('DOMContentLoaded', function() {
    const textElem = qs('#textOriginalArea');
    const outputArea = qs('#sentenceListArea');
    const buttonElem = qs('#breakBtn');

    buttonElem.addEventListener('click', function(event) {
        event.preventDefault(); // stop the button from submitting
        
        const text = textElem.textContent;
        const regex = /[^.!?]+[.!?]+/g;  //not start with .!? but end with .!?
        const sentences = text.match(regex) || [];

        const trimmedsentences = sentences.map((sentence) => sentence.trim());
        outputArea.innerHTML = trimmedsentences.map(sentence => "➢" + sentence).join('<br>');
    });
    
})