import cities from '../json files/cities.json' assert {type: 'json'};
import keywords from '../json files/keywords.json' assert {type: 'json'};
// import dotenv from 'dotenv';
// dotenv.config();

export const browserConfig = {
    headless: false,
    devtools: true,
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    args: ["--start-maximized", '--lang=bn-BD,bn', '--test-type', '--disable-infobars','--disable-features=DarkMode']
};

export const jsonFilePath = './json files/collectedData.json'

export { cities, keywords }