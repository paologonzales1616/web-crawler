const scholar = require("google-scholar");
const request = require("request-promise-native");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

async function downloadPDF(pdfURL, outputFilename) {
  try {
    let pdfBuffer = await request.get({ uri: pdfURL, encoding: null });
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
    console.log("Done downloading");
    return true;
  } catch (error) {
    console.log("Error Downloading pdf");
    return false;
  }
}

async function search(topic) {
  console.log("Spider started!!!");
  const data = require("../database/database.json");
  const result = await scholar.search(topic);
  console.log(result);
  result.results.map(doc => {
    if (doc.title != "") {
      if (doc.description != "") {
        if (doc.pdf != undefined) {
          if (!data.some(e => e.title == doc.title)) {
            const uid = uuidv1();
            if (downloadPDF(doc.pdf, "./pdf/" + uid + ".pdf")) {
              data.push({
                id: uid,
                title: doc.title,
                description: doc.description,
                pdf: doc.pdf
              });
            }
          }
        }
      }
    }
  });
  fs.writeFileSync("./database/database.json", JSON.stringify(data));
  console.log("Done");
}

module.exports = search;
