require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const elasticlunr = require("elasticlunr");
const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const fs = require("fs");
const path = require("path");

server.use(cors());
server.use(helmet());
server.use(bodyparser.json());
server.use(logger("dev"));
console.log("Middlewares loaded...");

require("./scheduler/index");


server.post("/search", async (req, res) => {
  const { search } = req.body;
  const database = require("./database/database.json");
  var index = elasticlunr(function() {
    this.addField("title");
    this.addField("description");
    this.setRef("id");
  });

  database.map(data => index.addDoc(data));
  let temp = [];
  const result = index.search(search);
  result.find(index => {
    database.map(data => {
      if (index.ref == data.id) {
        temp.push(data);
      }
    });
  });

  res.json(temp);
});

server.get("/doc/count", async (req, res) => {
  const database = require("./database/database.json");
  res.json({ count: database.length });
});

server.get("/pdf/:uid", (req, res) => {
  const { uid } = req.params;
  const file = fs.createReadStream("./pdf/" + uid + ".pdf");
  const stat = fs.statSync("./pdf/" + uid + ".pdf");
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=" + uid + ".pdf");
  file.pipe(res);
});

// Serve the static files from the React app
server.use(express.static(path.join(__dirname, "client/crawler/build")));

// Handles any requests that don't match the ones above
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/crawler/build/index.html"));
});


server.listen(port, () =>
  console.log(`API server running on host: http://localhost:${port}`)
);
