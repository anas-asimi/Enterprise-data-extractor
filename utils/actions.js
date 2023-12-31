export async function goToSearchPage(page) {
	console.log("going to search page");
	await page.goto(`https://www.google.com/search?q=casablanca+irrigation`);
	page.click("g-more-link");
	await page.waitForNavigation({ waitUntil: "networkidle0" });
}

export async function searchFor(page, searchWord) {
	console.log(`search for => '${searchWord}'`);
	// type searchWord
	await page.evaluate((string) => {
		document.querySelector('textarea[title="Rechercher"]').value = string;
	}, searchWord);
	// submit search
	page.click('[aria-label="Recherche Google"]');
	await page.waitForNavigation({ waitUntil: "networkidle0" });
}

export async function getData(page) {
	// loop over all results in page
	let data = Array();
	while (true) {
		try {
			data.push(...(await getDataFromSearchPage(page)));
		} catch (error) {
			throw new Error(error);
		}
		// checking if there is a second page
		console.log("checking if there is a second page");
		let nextPage = await page.$("a#pnnext");
		if (nextPage) {
			console.log("found next page");
			await Promise.all([
				page.waitForResponse((response) =>
					response.url().includes("search?vet=")
				),
				nextPage.click(),
			]);
			await page.waitForTimeout(1000);
			// continue the loop
		} else {
			console.log("no next page");
			break;
			// break the loop
		}
	}
	return data;
}

export async function getDataFromSearchPage(page) {
	let data = Array();
	console.log("start crawling");
	let linkSelector =
		'div[jscontroller="AtSb"] > div:last-child > div > div > a.vwVdIc.wzN8Ac.rllt__link';
	const links = await page.$$(linkSelector);
	if (links.length == 0) {
		console.log("found nothing");
		return data;
	}
	console.log("found ", links.length);

	for (const link of links) {
		console.log("requesting data");
		try {
			await Promise.all([
				page.waitForResponse((response) =>
					response.url().includes("GetWebResults")
				),
				link.click(),
			]);
		} catch (error) {
			throw new Error(error);
		}
		console.log("extract data");
		let EnterpriseData = await page.evaluate(() => {
			let card = document.querySelector("block-component");
			if (!card) {
				throw new Error("card element is null");
			}
			let actions = card.querySelector("c-wiz > div > div");
			// NAME
			let name = card.querySelector("h2 span")?.innerText;
			// PHONE NUMBER
			let phoneNumberEle = actions.querySelector("[data-phone-number]");
			let phoneNumber = phoneNumberEle
				? phoneNumberEle.getAttribute("data-phone-number")
				: "";
			// WEBSITE LINK
			let websiteLinkEle = actions.querySelector(
				'[jsname="UXbvIb"] > a[ping]'
			);
			let websiteLink = websiteLinkEle
				? websiteLinkEle.getAttribute("href")
				: "";
			// LOCATION
			let locationEle = card.querySelector(
				'[data-attrid="kc:/location/location:address"]'
			);
			let location = locationEle
				? locationEle.querySelector("span.LrzXr").innerText
				: "";
			return {
				name,
				phoneNumber,
				websiteLink,
				location,
			};
		});
		console.log(EnterpriseData);
		data.push(EnterpriseData);
	}
	return data;
}

export async function switchTheme(page) {
	page.click(".rctAzd");
	await page.waitForNavigation({ waitUntil: "networkidle0" });
}
