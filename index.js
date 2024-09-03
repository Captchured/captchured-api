const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/capture', (req, res) => {
    // Extracted data from frontend
    const { key_count, key_sequence, time_delay, mouse_movements, mouse_clicks } = req.body;

    // Log the received data
    console.log('Received Data:', {
        key_count,
        key_sequence,
        time_delay,
        mouse_movements,
        mouse_clicks
    });

    /* (WILL IMPLEMENT WHEN MODEL's API IS THERE)
    try {
        // Data to be given to ML model's API (anikate & nihaal)
        const mlResponse = await axios.post('http://ml-model-endpoint/api', {
            key_count,
            key_sequence,
            time_delay,
            mouse_movements,
            mouse_clicks
        });
        const prediction = mlResponse.data;

        // Model's response back to frontend
        res.json({ prediction });
    } catch (error) {
        console.error('Error sending data to ML model:', error);
        res.status(500).json({ error: 'Error processing data' });
    }
    */

    // Just for checking rn
    res.json({ key_count, key_sequence, time_delay, mouse_movements, mouse_clicks });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
