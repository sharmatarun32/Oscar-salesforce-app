const cron = require("node-cron");
require("dotenv").config();

const {
  processJobCost,
  processUpdateJobCost,
} = require("./src/scripts/cronFunctions");

const syncData = async () => {
  try {
    console.log("---------sync data initialized------------");

    await processJobCost();

    await processUpdateJobCost();

    console.log("Data synced successfully.");
  } catch (error) {
    console.error("Error syncing data:", error);
  }
};

const cronScd = process.env.CRON_SCHEDULE || "20 8 * * *";
console.log(cronScd);
cron.schedule(
  cronScd,
  () => {
    syncData();
  },
  {
    scheduled: true,
    timezone: "UTC",
  }
);
