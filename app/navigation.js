async function navigateToPage(page, url) {
    await page.goto(url, { waitUntil: 'networkidle2' });
}

module.exports = navigateToPage;
