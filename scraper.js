// scraper.js
const puppeteer = require("puppeteer");
const { connectToDB } = require("./db");

async function scrapePage(url, page) {
  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract the first integer from the meta description
  const totalResults = await page.evaluate(() => {
    const metaContent = document.querySelector(
      'meta[name="description"]'
    ).content;
    const firstInteger = metaContent.match(/\d+/)[0];
    console.log({metaContent, firstInteger})
    return parseInt(firstInteger, 10);
  });

  // Calculate total number of pages
  const resultsPerPage = 15;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Extract job data
  const jobData = await page.evaluate(() => {
    const data =
      window.mosaic.providerData["mosaic-provider-jobcards"].metaData
        .mosaicProviderJobCardsModel.results;

    return data.map((job) => ({
      metadata: {
        key: job.jobkey,
        fresh: job.newJob,
        createdAt: job.createDate,
        title: job.title,
        displayTitle: job.displayTitle,
        normTitle: job.normTitle,
      },
      company: {
        name: job.company,
        score: job.companyRating,
        count: job.companyReviewCount,
        link: job.companyOverviewLink,
      },
      salary: {
        salaryText: job.salarySnippet?.text,
        salaryMin: job.extractedSalary?.min,
        salaryMax: job.extractedSalary?.max,
        salaryType: job.extractedSalary?.type,
      },
      location: {
        city: job.jobLocationCity,
        zip: job.jobLocationPostal,
        state: job.jobLocationState,
      },
      additional: {
        benefits: job.taxonomyAttributes
          .find((el) => el.label === "benefits")
          ?.attributes.map((benefit) => benefit.label),
        schedule: job.taxonomyAttributes
          .find((el) => el.label === "schedules")
          ?.attributes.map((schedule) => schedule.label),
        jobTypes: job.taxonomyAttributes
          .find((el) => el.label === "job-types")
          ?.attributes.map((jobType) => jobType.label),
        shifts: job.taxonomyAttributes
          .find((el) => el.label === "shifts")
          ?.attributes.map((shift) => shift.label),
      },
    }));
  });

  return { jobData, totalPages };
}

async function runScraper() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const db = await connectToDB();
  const collection = db.collection("jobs"); // Replace with your collection name

  let url = "https://www.indeed.com/jobs?q=truck+driver&l=Cincinnati%2C+OH"; // Replace with your target URL
  let currentPage = 1;
  let stopScraping = false;

  while (!stopScraping) {
    const { jobData, totalPages } = await scrapePage(url, page);

    // Store data in MongoDB
    if (jobData.length) {
      await collection.insertMany(jobData);
      console.log(`Inserted ${jobData.length} jobs from page ${currentPage}`);
    }

    // Stop condition
    if (currentPage >= totalPages) {
      stopScraping = true;
    } else {
      currentPage++;
      url = `https://www.indeed.com/jobs?q=truck+driver&l=Cincinnati%2C+OH&start=${
        (currentPage - 1) * 10
      }`; // Update URL for the next page
    }
  }

  await browser.close();
  console.log("Scraping completed!");
}

runScraper().catch(console.error);
