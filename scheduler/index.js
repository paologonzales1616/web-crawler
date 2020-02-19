const cron = require("node-cron");
const search = require("../scholar/index");
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
setInterval(() => {
  console.log("Scheduler Started");
  const topics = require("../database/topics.json");
  search(topics[getRandomInt(topics.length - 1)]);
}, 3.6e+6);
