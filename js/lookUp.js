import OpenAI from "openai";

export async function displayLookUp(event, inputElem, outputElem, selection, checkboxChinese, checkboxEnglish, checkboxExample) {
    event.preventDefault(); // Stop the button from submitting

    const fullText = inputElem.innerText;
    let pass = checkCondition(selection, checkboxChinese, checkboxEnglish, checkboxExample)
    if (pass !== false) {
        // create div for notes
        let divElem = document.createElement('div');
        divElem.classList.add('note');
        divElem.setAttribute('contenteditable', 'true');

        // populate notes
        const chinese = '';
        const english = '';
        const example = '';
        if (checkboxChinese.checked) {
            chinese = 'the Traditional Chinese translation';
            };
        if (checkboxEnglish.checked) {
            english = 'the definition of the word';
            };
        if (checkboxExample.checked) {
            example = 'an original example sentence';
        }
        const result = await lookUp(selection, fullText, chinese, english, example);
        divElem.innerHTML = result;
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

async function lookUp(selection, fullText, chinese, english, example) {
    const instructions = `For the ${selection} provided from the ${fullText}, analyze and present the following details: the ${selection} itself followed by a colon, the part of speech of the ${selection}, abbreviated and enclosed in parentheses, ${chinese}, ${english}, ${example} using ${selection}, which is not derived from the ${fullText}.  Ensure each piece of information is listed on a separate line.`;
    const openai = new OpenAI();

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful English language teacher."},
                {"role": "user", "content": "I fly a plane.  For 'fly' in this sentence, analyze this sentence and present the following details: word, part of speech, traditional Chinese, English definition, example sentence"},
                {"role": "assistant", "content": 'fly: (v.)\n駕駛飛機\nmove through the air under control\nThe pilot has flown for years.'},
                {"role": "user", "content": instructions }
            ],
            model: "gpt-3.5-turbo",
            temperature: 1.5,
        });
        console.log(completion.choices([0].message.content));
    } catch (error) {
        console.error("Failed to fetch the completion: ", error);
    }
    
}
