async function scrapeJobData(page) {
  const jobList = await page.evaluate(() => {
    const jobData =
      window.mosaic.providerData["mosaic-provider-jobcards"].metaData
        .mosaicProviderJobCardsModel.results;

    return jobData.map((job) => ({
      name: job.company,
      score: job.companyRating,
      count: job.companyReviewCount,
      link: job.companyOverviewLink,
      createdAt: job.createDate,
      fresh: job.newJob,
      key: job.jobkey,
      benefits: job.taxonomyAttributes.find((el) => el.label === "benefits").attributes.map((benefit) => benefit.label),
      title: job.title,
      displayTitle: job.displayTitle,
      normTitle: job.normTitle,
      salaryText: job.salarySnippet.text,
      salaryMin: job.extractedSalary?.min,
      salaryMax: job.extractedSalary?.max,
      salaryType: job.extractedSalary?.type,
      schedule: job.taxonomyAttributes.find((el) => el.label === "schedules").attributes.map((schedule) => schedule.label),
      jobTypes: job.taxonomyAttributes.find((el) => el.label === "job-types").attributes.map((jobType) => jobType.label),
      shifts: job.taxonomyAttributes.find((el) => el.label === "shifts").attributes.map((shift) => shift.label),
      city: job.jobLocationCity,
      zip: job.jobLocationPostal,
      state: job.jobLocationState,
    }));
  });

  return jobList;
}

module.exports = scrapeJobData;
