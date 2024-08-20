const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
    const db = new sqlite3.Database('jobs.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            db.run(`
                CREATE TABLE IF NOT EXISTS jobs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    company TEXT,
                    companyRating TEXT,
                    companyReviewCount INTEGER,
                    companyOverviewLink TEXT,
                    createDate TEXT,
                    displayTitle TEXT,
                    extractedSalary TEXT,
                    formattedLocation TEXT,
                    formattedRelativeTime TEXT,
                    highQualityMarketplace TEXT,
                    highVolumeHiringModel TEXT,
                    jobCardRequirementsModel TEXT,
                    jobLocationCity TEXT,
                    jobLocationExtras TEXT,
                    jobLocationPostal TEXT,
                    jobLocationState TEXT,
                    jobkey TEXT,
                    newJob TEXT,
                    normTitle TEXT,
                    salarySnippet TEXT,
                    taxonomyAttributes TEXT,
                    title TEXT
                );
            `);
        }
    });

    return db;
}

function saveJobData(db, jobData) {
    const insertQuery = `
        INSERT INTO jobs (
            company, companyRating, companyReviewCount, companyOverviewLink, createDate, displayTitle,
            extractedSalary, formattedLocation, formattedRelativeTime, highQualityMarketplace, highVolumeHiringModel,
            jobCardRequirementsModel, jobLocationCity, jobLocationExtras, jobLocationPostal, jobLocationState,
            jobkey, newJob, normTitle, salarySnippet, taxonomyAttributes, title
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    jobData.forEach((job) => {
        db.run(insertQuery, [
            job.company, job.companyRating, job.companyReviewCount, job.companyOverviewLink, job.createDate,
            job.displayTitle, job.extractedSalary, job.formattedLocation, job.formattedRelativeTime, job.highQualityMarketplace,
            job.highVolumeHiringModel, job.jobCardRequirementsModel, job.jobLocationCity, job.jobLocationExtras,
            job.jobLocationPostal, job.jobLocationState, job.jobkey, job.newJob, job.normTitle, job.salarySnippet,
            job.taxonomyAttributes, job.title
        ], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
    });
}

module.exports = {
    initializeDatabase,
    saveJobData
};
