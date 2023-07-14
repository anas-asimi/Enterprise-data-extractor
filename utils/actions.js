import browser from "./browser.js";
import { getPage } from "./page.js";

export function makeURL(keyword, city) {
    return `https://www.google.com/search?q=${keyword}+${city}`
        .replaceAll(" ", "+")
        .replaceAll("&", "%26");
}

export async function getData(URL) {
    console.log('visiting ' + URL);
    const page = await getPage(browser);
    await page.goto(URL);
    await page.waitForSelector("g-more-link a")
    await page.click("g-more-link a");
    let data = await getDataFromWebPage(page);
    return data;
}

export async function getDataFromWebPage(page) {
    let dataArray = []
    console.log('start crawling');
    let linkSelector = 'div[jscontroller="AtSb"] > div:last-child > div > div > a'
    await page.waitForSelector(linkSelector)
    const links = await page.$$(linkSelector)
    console.log('found :',links.lenght);
    if (links.lenght == 0) {
        console.log('no links');
        throw new Error('no links in current page')
    }
    for (const link of links) {
        link.click()
        await page.waitForNetworkIdle()
        let EnterpriseData = await page.evaluate(
            () => {
                let dataCard = document.querySelector('block-component')
                let actionsElement = dataCard.querySelector('c-wiz > div > div')
                // NAME
                let name = dataCard.querySelector('h2 span').innerText
                // PHONE NUMBER
                let phoneNumberEle = actionsElement.querySelector('[data-phone-number]')
                let phoneNumber
                if (phoneNumberEle) {
                    phoneNumber = phoneNumberEle.getAttribute('data-phone-number')
                }
                // WEBSITE LINK
                let websiteLinkEle = actionsElement.querySelector('[jsname="UXbvIb"] > a')
                let websiteLink
                if (websiteLinkEle) {
                    websiteLink = websiteLinkEle.getAttribute('href')
                }
                // LOCATION
                let locationEle = dataCard.querySelector('[data-attrid="kc:/location/location:address"]')
                let location
                if (locationEle) {
                    location = locationEle.querySelector('span.LrzXr').innerText
                }
                return {
                    name,
                    phoneNumber,
                    websiteLink,
                    location
                }
            }
        )
        console.log(EnterpriseData)
        dataArray.push(EnterpriseData)
    }
    return dataArray
}
