const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const fs = require("fs");
// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.post("/capture", async (req, res) => {
  // Extracted data from frontend
  const {
    key_count,
    key_sequence,
    time_delay,
    mouse_movements,
    mouse_clicks,
    total_time,
    environment,
  } = req.body;

  const { cookies } = environment;

  // Logging the received data including cookies
  console.log("Received Data:", {
    key_count,
    key_sequence,
    time_delay,
    mouse_movements,
    mouse_clicks,
    total_time,
    environment,
  });

  console.log("Cookies:", cookies); // Logging the cookies separately

//   fs.writeFile("data.json", JSON.stringify(req.body, null, 2), (err) => {
//     if (err) {
//       console.log("error is coming");
//     }
//   });
  try {
    const mlResponse = await axios.post(
      "https://ac5c-117-213-200-58.ngrok-free.app/predict",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      } 
    );

    const { flag, confidence } = mlResponse.data;

    // Prediction logic result based on the flag and confidence
    let predictionResult = "";
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
    console.error("Error sending data to ML model:", error);
    res.status(500).json({ error: "Error processing data" });
  }

  // For testing purposes, will just send a success message
  // res.json({ message: 'Data received and processed successfully', cookies });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
