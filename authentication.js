require("dotenv").config();

//const env_apiKey = process.env.API_KEY;
let finalApiKey = null;
let cmd_apiKey = null;

function setApiKey() {
  let cmdApiKey = process.argv[2];
  if (cmdApiKey != null) {
    if (cmdApiKey.indexOf("=") >= 0) {
      cmd_apiKey = cmdApiKey.substring(
        cmdApiKey.indexOf("=") + 1,
        cmdApiKey.length
      );
      console.log("commandline apikey is set");
      finalApiKey = cmd_apiKey;
    }
  }
  //commandline api key is not there
  if (!cmd_apiKey) {
    const env_apiKey = process.env.API_KEY;
    finalApiKey = env_apiKey;
    //api key is not there in environment file
    if (!env_apiKey) {
      console.log(
        "apiKey has no value. Please provide a value through the API_KEY env var or --api-key cmd line parameter."
      );
      finalApiKey = null;
      process.exit(0);
    }
  }
}

const authenticateKey = (req, res, next) => {
  let header_api_key = req.header("x-api-key"); // API key from headers
  //var query = require("url").parse(req.url, true).query; // api key from query param
  //let qp_api_key = query.api_key;
  let auth = false;

  if (!header_api_key) {
    res.status(401).send("API Key is missing");
  } else if (finalApiKey === header_api_key) {
    auth = true;
  } else {
    res.status(403).send("API Key is invalid");
  }
  if (auth) {
    next();
  }
};

module.exports = { authenticateKey, setApiKey };
