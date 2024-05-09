import { lookUp } from "./lookUp";

// ----- select element -----
export function qs(selector) {
    return document.querySelector(selector);
  }
// ----- end of select element -----
  
// ----- toggle hint -----
export function toggleHint(icon, selector, jsonKey) {
    const iconElem = qs(icon);
    const divElem = qs(selector);
    iconElem.addEventListener('click', async(e) => {
        if (divElem.style.display === 'block') {
            divElem.style.display = 'none';
        } else {
            divElem.style.display = 'block';
        }
        const hint = await fetchHint();
        if (hint) {
        return (divElem.innerHTML = hint[jsonKey]);
        } else {
        return (divElem.innerHTML = "Failed to show hints");
        }
    })
}

async function fetchHint() {
  const url = "../data/hint.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch hint failure: ", error);
    return null;
  }
}
// ----- end of toggle hint -----

  
// ----- clear content -----
export function clearContent(button, divElem) {
  const clearBtn = qs(button);
  

  if (!clearBtn || !divElem) {
    console.error(`${clearBtn} or ${divElem} is missing.`);
    return;
  }

  clearBtn.addEventListener('click', () => {
    divElem.textContent = ""
  })
}
// ----- end of clear content -----

// ----- process language -----
export function processLanguage(inputElem, outputElem, executeBtn, execution) {
  const executeBtnElem = qs(executeBtn);
  executeBtnElem.addEventListener('click', event => {
    
    if (execution === lookUp) {
      var selection = document.getSelection().toString().trim();
      const checkboxChinese = qs('#chinese-meaning');
      const checkboxEnglish = qs('#english-meaning');
      const checkboxExample = qs('#example-sentence');
      lookUp(event, inputElem, outputElem, selection, checkboxChinese, checkboxEnglish, checkboxExample);
      } 
     else {
      execution(event, inputElem, outputElem,)
    }}
  )
}
// ----- end of process language -----

// ----- loading message -----
export function loading(outputElem, text) {
  outputElem.textContent = `Generating ${text}.  Please wait.`;
  return outputElem
}
// ----- end of loading message -----