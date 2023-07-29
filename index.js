import { cities, keywords, jsonFilePath } from "./utils/config.js";
import {
  goToSearchPage,
  getData,
  setTheme,
  searchFor,
  getDataFromWebPage,
} from "./utils/actions.js";
import json from "jsonfile";
import browser from "./utils/browser.js";
import { getPage } from "./utils/page.js";

async function main() {
  let allData = [];
  const page = await getPage(browser);
  // set theme to light mode
  await setTheme(page, "light");
  // go to search page
  await goToSearchPage(page);
  // start crawling
  for (const city of cities) {
    let enterprises = Array();
    for (const keyword of ["irrigation"]) {
      let searchWord = `${city} ${keyword}`.toLowerCase();
      await searchFor(page, searchWord);
      let data = await getData(page);
      enterprises.push(...data);
    }
    allData.push({ city, enterprises });
    json.writeFileSync(jsonFilePath, allData);
  }
  browser.close();
}


main();
