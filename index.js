import { cities, keywords, jsonFilePath } from "./utils/config.js";
import {
	goToSearchPage,
	getData,
	switchTheme,
	searchFor,
} from "./utils/actions.js";
import json from "jsonfile";
import browser from "./utils/browser.js";
import { getPage } from "./utils/page.js";

async function main() {
	let allData = Array();
	const page = await getPage(browser);
	// go to search page
	await goToSearchPage(page);
	// set theme to light mode
	await switchTheme(page);
	// start crawling
	for (const city of cities) {
		let enterprises = Array();
		for (const keyword of ["irrigation"]) {
			let searchWord = `${city} ${keyword}`.toLowerCase();
			await searchFor(page, searchWord);
			enterprises.push(...(await getData(page)));
		}
		allData.push({ city, enterprises });
		json.writeFileSync(jsonFilePath, allData);
	}
	browser.close();
}

main();
