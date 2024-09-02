const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); 
app.post('/capture', async (req, res) => {
    // frontend ka extracted data
    const { enrolmentID, EIDDate, EIDTime, captcha } = req.body;

    /*   (WILL IMPLEMENT WHEN MODEL's API IS THERE)
    try {
        // data to be given to ml model's API (anikate & nihaal)
        const mlResponse = await axios.post('http://ml-model-endpoint/api', {
            enrolmentID,
            EIDDate,
            EIDTime,
            captcha
        });
        const prediction = mlResponse.data;

        // model's response back to frontedn
        res.json({ prediction });
    } catch (error) {
        console.error('Error sending data to ML model:', error);
        res.status(500).json({ error: 'Error processing data' });
    }
        */

    // just for checking rn
    res.json({ enrolmentID, EIDDate, EIDTime, captcha });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
