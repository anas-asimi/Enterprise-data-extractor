import { cities, keywords } from './utils/config.js';
import { makeURL, getData } from './utils/actions.js';

async function Main() {
    console.log('\n'.repeat(5));
    for (const city of ['meknes']) {
        for (const keyword of ['irrigation']) {
            let URL = makeURL(keyword, city)
            let data = await getData(URL)
        }
    }
}

Main()