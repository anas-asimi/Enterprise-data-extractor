import cities from '../json files/cities.json' assert {type: 'json'};
import keywords from '../json files/keywords.json' assert {type: 'json'};
// import dotenv from 'dotenv';
// dotenv.config();

export const browserConfig = {
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
};

export {cities ,keywords}