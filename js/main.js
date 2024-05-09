import { 
  qs, 
  toggleHint, 
  clearContent, 
  processLanguage 
} from "./util.js";
import { breakSentence } from "./breakSentence.js";
import { translateSentence } from "./translate.js";
import { lookUp } from "./lookUp.js";

document.addEventListener("DOMContentLoaded", () => {
  const textOriginalElem = qs('#textOriginalArea');
  const sentenceListElem = qs('#sentenceListArea');
  const translationElem = qs('#translationArea');
  const notesElem = qs('#notesArea');

  toggleHint("#originalQ", "#originalHint", "originalHint");
  toggleHint("#listQ", "#listHint", "listHint");
  toggleHint("#translationQ", "#translationHint", "translationHint");
  toggleHint("#notesQ", "#notesHint", "notesHint");

  clearContent('#clearOriginalBtn', textOriginalElem);
  clearContent('#clearListBtn', sentenceListElem);
  clearContent('#clearTranslationBtn', translationElem);
  clearContent('#clearNotesBtn', notesElem);

  processLanguage(textOriginalElem, sentenceListElem, '#breakBtn', breakSentence);
  processLanguage(sentenceListElem, translationElem, '#translateBtn', translateSentence);
  processLanguage(translationElem, notesElem, '#lookUpBtn', lookUp);

})



