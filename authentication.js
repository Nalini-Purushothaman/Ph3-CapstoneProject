require("dotenv").config();

const apiKey = process.env.API_KEY;

const authenticateKey = (req, res, next) => {
  //let api_key = req.header("x-api-key"); //Add API key to headers
  var query = require("url").parse(req.url, true).query; // api key from query param
  let api_key = query.api_key;
  let auth = false;
  if (!api_key) {
    res.status(401).send("API Key is missing");
  } else if (apiKey === api_key) {
    auth = true;
  } else {
    res.status(403).send("API Key is invalid");
  }
  if (auth) {
    next();
  }
};

module.exports = { authenticateKey };
