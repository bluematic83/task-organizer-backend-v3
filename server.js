
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /tasks - Fetch tasks from the JSON file
app.get('/tasks', (req, res) => {
    const filePath = path.join(__dirname, 'tasks.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks.' });
        }
        try {
            const tasks = JSON.parse(data);
            res.json(tasks);
        } catch (parseErr) {
            res.status(500).json({ error: 'Invalid JSON format in tasks file.' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
