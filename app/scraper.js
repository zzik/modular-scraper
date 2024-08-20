async function scrapeJobData(page) {
    const jobList = await page.evaluate(() => {
        const jobData = window.mosaic.providerData["mosaic-provider-jobcards"].metaData
            .mosaicProviderJobCardsModel.results;

        return jobData.map((job) => ({
            company: job.company,
            companyRating: job.companyRating,
            companyReviewCount: job.companyReviewCount,
            companyOverviewLink: job.companyOverviewLink,
            createDate: job.createDate,
            displayTitle: job.displayTitle,
            extractedSalary: job.extractedSalary,
            formattedLocation: job.formattedLocation,
            formattedRelativeTime: job.formattedRelativeTime,
            highQualityMarketplace: job.highQualityMarketplace,
            highVolumeHiringModel: job.highVolumeHiringModel,
            jobCardRequirementsModel: job.jobCardRequirementsModel,
            jobLocationCity: job.jobLocationCity,
            jobLocationExtras: job.jobLocationExtras,
            jobLocationPostal: job.jobLocationPostal,
            jobLocationState: job.jobLocationState,
            jobkey: job.jobkey,
            newJob: job.newJob,
            normTitle: job.normTitle,
            salarySnippet: job.salarySnippet,
            taxonomyAttributes: job.taxonomyAttributes,
            title: job.title,
        }));
    });

    return jobList;
}

module.exports = scrapeJobData;
