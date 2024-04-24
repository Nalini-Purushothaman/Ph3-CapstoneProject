const express = require("express");
const path = require("path");
const da = require("./data-access");

const app = express();
const PORT = 4000;
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

app.get("/customers", async (req, res) => {
  const [cust, err] = await da.getCustomers();
  if (cust != null) {
    res.send(cust);
  } else {
    res.status(500).send(err);
  }
});
