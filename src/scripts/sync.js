const { postgresSequelize, mssqlSequelize } = require("../config/sequelize");
const Sequelize = require("sequelize");
const MssqlJobCost = require("../models/MssqlJobCost");
const PostgresJobCost = require("../models/PostgresJobCost");
const TableLock = require("../models/TableLock");

const syncModels = async () => {
  try {
    await mssqlSequelize.sync({ force: false, alter: false });
    console.log("MSSQL models synced.");

    await postgresSequelize.sync();
    console.log("PostgreSQL models synced.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

syncModels();
