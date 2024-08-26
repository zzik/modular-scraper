const setupBrowser = require('./app/browserSetup');
const navigateToPage = require('./app/navigation');
const scrapeJobData = require('./app/scraper');
const { initializeDatabase, saveJobData } = require('./app/db');

(async () => {
    const url = "https://www.indeed.com/jobs?q=truck+driver&l=Cincinnati%2C+OH";

    const { browser, page } = await setupBrowser();
    
    await navigateToPage(page, url);

    const jobData = await scrapeJobData(page);

    // Initialize database
    const db = initializeDatabase();

    // Save job data to the database
    saveJobData(db, jobData);
    console.log(jobData)

    await browser.close();
})();
