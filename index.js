const express = require("express");
const app = express();
app.use(express.json());
const { generateImages } = require("./imageHandler");

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/", async (req, res) => {
  const discount = Math.round(
    100 - 100 * (req.body.promotionPrice / req.body.refPrice)
  );
  generateImages(req.body.image, discount, function() {
    console.log("finished");
  });

  res.send("hello world");
});
