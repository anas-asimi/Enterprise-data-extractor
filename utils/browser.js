import puppeteer from "puppeteer-core";
import { browserConfig } from "./config.js";


let browser
if (!browser) {
    browser = await puppeteer.launch(browserConfig);
}
export default browser