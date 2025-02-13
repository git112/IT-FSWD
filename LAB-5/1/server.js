const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// Middleware to log visits
app.use((req, res, next) => {
    const logEntry = `${req.ip} - ${new Date().toISOString()}\n`;
    fs.appendFile('logs/visits.log', logEntry, (err) => {
        if (err) console.error('Error logging visit:', err);
    });
    next();
});

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get logs
app.get('/logs', (req, res) => {
    fs.readFile('logs/visits.log', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading logs' });
        }
        const logs = data.trim().split('\n').map(line => {
            const [ip, timestamp] = line.split(' - ');
            return { ip, timestamp };
        });
        res.json(logs);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 