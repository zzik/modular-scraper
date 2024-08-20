const puppeteer = require('puppeteer');

async function setupBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"],
        defaultViewport: null,
    });
    const page = await browser.newPage();
    return { browser, page };
}

module.exports = setupBrowser;
