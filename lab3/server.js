const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to the JSON file
const dataPath = path.join(__dirname, 'budget.json');

// Create budget.json if it doesn't exist
if (!fs.existsSync(dataPath)) {
    const initialData = {
        currencies: [],
        expenseTypes: [],
        incomeTypes: [],
        expenses: [],
        incomes: []
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
}

// GET endpoint to retrieve budget data
app.get('/api/budget', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading budget data:', error);
        res.status(500).json({ error: 'Error reading budget data' });
    }
});

// POST endpoint to save budget data
app.post('/api/budget', (req, res) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
        res.json({ message: 'Budget data saved successfully' });
    } catch (error) {
        console.error('Error saving budget data:', error);
        res.status(500).json({ error: 'Error saving budget data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
