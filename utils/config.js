import cities from '../json files/cities.json' assert {type: 'json'};
import keywords from '../json files/keywords.json' assert {type: 'json'};
import { getEdgePath } from 'edge-paths';

export const browserConfig = {
	executablePath: getEdgePath(),
	headless: false,
	devtools: true,
	defaultViewport: null,
	ignoreDefaultArgs: ["--enable-automation"],
	args: [
		"--start-maximized",
		"--lang=bn-BD,bn",
		"--test-type",
		// "--disable-infobars",
		// "--disable-features=DarkMode",
		"--guest",
	],
};

export const jsonFilePath = './json files/collectedData.json'

export { cities, keywords }