import puppeteer from "puppeteer";
import { browserConfig } from "./config.js";


let browser
if (!browser) {
    browser = await puppeteer.launch(browserConfig);
}
export default browser