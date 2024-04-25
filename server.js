const express = require("express");
const path = require("path");
const da = require("./data-access");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

app.get("/customers", async (req, res) => {
  const [cust, err] = await da.getCustomers();
  console.log("get customer");
  if (cust) {
    res.send(cust);
  } else {
    res.status(500).send(err);
  }
});

app.get("/reset", async (req, res) => {
  const [custCount, err] = await da.resetCustomers();
  console.log("reset customer");
  if (custCount) {
    res.send(custCount.toString());
  } else {
    res.status(500).send(err);
  }
});

app.post("/customers", async (req, res) => {
  const newCustomer = req.body;
  console.log("add new customer");
  if (Object.keys(req.body).length === 0) {
    res.status(400).send("missing request body");
  } else {
    const [status, id, err] = await da.addCustomer(newCustomer);
    if (status === "success") {
      res.status(201);
      let response = { ...newCustomer };
      response["_id"] = id;
      res.send(response);
    } else {
      res.status(400).send(err);
    }
  }
});

app.get("/customers/:id", async (req, res) => {
  const [cust, err] = await da.getCustomerById(req.params.id);
  console.log("get customer by id");
  if (cust) {
    res.send(cust);
  } else {
    res.status(404).send(err);
  }
});

app.put("/customers/:id", async (req, res) => {
  const updatedCustomer = req.body;
  const id = updatedCustomer.id;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send("missing request body");
  } else {
    delete updatedCustomer._id;
    const [msg, err] = await da.updateCustomer(updatedCustomer);
    console.log("update customer by id");
    if (msg) {
      res.send(msg);
    } else {
      res.status(400).send(err);
    }
  }
});
