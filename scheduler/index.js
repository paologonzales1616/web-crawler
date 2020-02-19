const cron = require("node-cron");
const search = require("../scholar/index");
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

cron.schedule('*/5 * * * *', () => {
    console.log("Scheduler Started");
  const topics = require("../database/topics.json");
  search(topics[getRandomInt(topics.length - 1)]);
});

// setInterval(() => {

// }, 300000);
