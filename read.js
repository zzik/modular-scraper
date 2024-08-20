const { initializeDatabase, readJobData } = require('./app/readJobs');

(async () => {
    // Initialize database connection
    const db = initializeDatabase();

    // Read job data from the database
    try {
        const jobs = await readJobData(db);
        console.log(jobs);  // Log the job data to the console
    } catch (error) {
        console.error(error);
    }

    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
    });
})();
