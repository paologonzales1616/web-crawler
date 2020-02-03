require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;

server.use(cors());
server.use(helmet());
server.use(bodyparser.json());
server.use(logger("dev"));
console.log("Middlewares loaded...");

// require("./scheduler/index")
require("./scholar/index")

server.listen(port, () =>
  console.log(`API server running on host: http://localhost:${port}`)
);
