import express from "express";
//const path=require('path');
import path from "path";

const app = express();
const PORT = 4000;
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
