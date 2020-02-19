const scholar = require("google-scholar");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

async function search(topic) {
  console.log("Spider started!!!");
  const data = require("../database/database.json");
  const result = await scholar.search(topic);
  result.results.map(doc => {
    if (doc.title != "") {
      if (doc.description != "") {
        if (doc.pdf != undefined) {
          if (!data.some(e => e.title == doc.title)) {
            const link = doc.pdf.split(".");
            if (link[link.length - 1] == "pdf") {
              const uid = uuidv1();
              console.log("Saving document");
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
