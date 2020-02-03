const scholar = require("google-scholar");
const fetch = require("node-fetch");
const request = require("request-promise-native");
const fs = require("fs");

async function downloadPDF(pdfURL, outputFilename) {
  let pdfBuffer = await request.get({ uri: pdfURL, encoding: null });
  console.log("Writing downloaded PDF file to " + outputFilename + "...");
  fs.writeFileSync(outputFilename, pdfBuffer);
  console.log("Done downloading");
}

function search() {
  scholar.search("machine learning").then(resultsObj => {
    console.log(resultsObj);
  });
}

search();
