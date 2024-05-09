export function displayLookUp(event, inputElem, outputElem, selection, checkboxChinese, checkboxEnglish, checkboxExample) {
    event.preventDefault(); // Stop the button from submitting

    let pass = checkCondition(selection, checkboxChinese, checkboxEnglish, checkboxExample)
    if (pass !== false) {
        // create div for notes
        let divElem = document.createElement('div');
        divElem.classList.add('note');
        divElem.setAttribute('contenteditable', 'true');

        // populate notes
        divElem.innerHTML = `<strong>${selection}</strong><br>`;
        if (checkboxChinese.checked) {
            divElem.innerHTML += `Chinese<br>`;
            };
        if (checkboxEnglish.checked) {
            divElem.innerHTML += `English<br>`;
            };
        if (checkboxExample.checked) {
            divElem.innerHTML += `Example<br>`
        }
        outputElem.appendChild(divElem);
    }
}

function checkCondition(selection, checkboxChinese, checkboxEnglish, checkboxExample) {
        if (selection === '') {
        alert('請先選取字再查單詞')
        return false;
    }
    if (!checkboxChinese.checked && !checkboxEnglish.checked && ! checkboxExample.checked) {
        alert('勾選「中文」、「English」、「例句」');
        return false;
    }
}

// async function 
