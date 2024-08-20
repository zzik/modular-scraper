const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
    const db = new sqlite3.Database('jobs.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        }
    });
    return db;
}

function readJobData(db) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM jobs`;
        db.all(query, [], (err, rows) => {
            if (err) {
                reject('Error reading data:', err.message);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    initializeDatabase,
    readJobData
};
