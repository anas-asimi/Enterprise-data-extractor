export async function getPage(browser) {
    if (!browser) {
        throw new Error('tried to get page whene no browser is active')
    }
    let pages = await browser.pages()
    if (pages.length > 0) return pages[0]
    return await browser.newPage()
}

export async function keepOnePage(browser) {
    if (browser) {
        throw new Error('tried to get page when no browser is active')
    }
    let pages = await browser.pages()
    let newPage = await browser.newPage()
    for (const page of pages) {
        if (page === newPage) continue
        await page.close()
    }
    return newPage
}

export async function turnOnDataSaving(page) {
    await page.setRequestInterception(true);
    await page.on("request", (req) => {
        let resourceType = req.resourceType();
        if (resourceType === "document") {
            req.continue();
        } else {
            req.abort();
        }
    });
}
