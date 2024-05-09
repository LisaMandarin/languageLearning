import OpenAI from "openai";
const text = 'Frozen produce is mostly picked and frozen at the peak of ripeness, whereas some fresh produce is picked under ripe. '
const word = 'whereas'
const instructions = "For the word provided from the text, analyze and present the following details: the word itself followed by a colon, the part of speech of the word, abbreviated and enclosed in parentheses, the Traditional Chinese translation, the definition of the word, an original example sentence using the word, which is not derived from the text.  Ensure each piece of information is listed on a separate line."
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": text},
        {"role": "assistant", "content": instructions},
        {"role": "user", "content": `text: ${text}, word: ${word}`}],
    model: "gpt-3.5-turbo",
    temperature: 1,
  });

  console.log(completion.choices[0]);
}
main();