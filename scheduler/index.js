const cron = require("node-cron");

cron.schedule(
  "0-59 * * * * *",
  () => {
    console.log("Running Cron Job");
  },
  { timezone: "Asia/Singapore" }
);
