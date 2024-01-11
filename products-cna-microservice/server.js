// Loads the configuration from config.env to
const deals = require("./data/deals");
const products = require("./data/products");

const express = require("express");
const cors = require("cors");
// get MongoDB driver connection
const dbo = require("./db/conn");

const PORT = process.env.SERVER_PORT || 5010;
const app = express();
console.log(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
