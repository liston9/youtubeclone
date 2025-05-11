import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();

app.use(express.json());

app.post('/process-video', (req, res) => {
  res.send('POST request to homepage')
  const inputVideoPath = req.body.inputVideoPath; // Path to the input video file
  const outputVideoPath = req.body.outputVideoPath; // Path to save the processed video

  if (!inputVideoPath) {
    res.status(400).send("Input video path is required");
  }
  if (!outputVideoPath) {
    res.status(400).send("Output video path is required");
  }
  ffmpeg(inputVideoPath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", function() {
      console.log("Video processing finished successfully");
      res.status(200).send("Video processing finished successfully");
    })
    .on("error", (err) => {
      console.log("Error processing video: "+err.message);
      res.status(500).send("Internal server error: " + err.message);
    })
    .save(outputVideoPath);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
