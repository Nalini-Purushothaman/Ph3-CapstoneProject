const express = require("express");
const path = require("path");
const da = require("./data-access");

const app = express();
const PORT = 4000;
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

app.get("/customers", async (req, res) => {
  const [cust, err] = await da.getCustomers();
  if (cust) {
    res.send(cust);
  } else {
    res.status(500).send(err);
  }
});

app.get("/reset", async (req, res) => {
  const [custCount, err] = await da.resetCustomers();
  if (custCount) {
    res.send(custCount.toString());
  } else {
    if (statusCode >= 100 && statusCode < 600) res.status(statusCode);
    else res.status(500).send(err);
  }
});
