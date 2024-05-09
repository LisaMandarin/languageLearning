import { qs } from "./util.js";

const url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=mask';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b58f68877msh09e7f1c9031ff15p14b078jsnbd682f41b858',
		'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}