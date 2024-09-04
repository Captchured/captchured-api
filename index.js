const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/capture', async (req, res) => {
    // Extracted data from frontedn
    const { key_count, key_sequence, time_delay, mouse_movements, mouse_clicks, total_time, environment } = req.body;

    // Logging the received data
    console.log('Received Data:', {
        key_count,
        key_sequence,
        time_delay,
        mouse_movements,
        mouse_clicks,
        total_time,
        environment
    });

    try {
        // Send the data to the ML model's API(when received)
        const mlResponse = await axios.post('http://ml-model-endpoint/api', {
            key_count,
            key_sequence,
            time_delay,
            mouse_movements,
            mouse_clicks,
            total_time,
            environment
        });

        const { flag, confidence } = mlResponse.data;

        //  Prediction logic result based on the flag and confidence
        let predictionResult = '';
        if (flag === 0) {
            if (confidence >= 99) {
                predictionResult = `The confidence of the classification is ${confidence}%: Guaranteed human.`;
            } else {
                predictionResult = `The confidence of the classification is ${confidence}%: likely human.`;
            }
        } else if (flag === 1) {
            if (confidence >= 99) {
                predictionResult = `The confidence of the classification is ${confidence}%: Guaranteed bot.`;
            } else {
                predictionResult = `The confidence of the classification is ${confidence}%: likely bot.`;
            }
        }

        // Sending prediction result back to the frontend
        res.json({ predictionResult });
    } catch (error) {
        console.error('Error sending data to ML model:', error);
        res.status(500).json({ error: 'Error processing data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
