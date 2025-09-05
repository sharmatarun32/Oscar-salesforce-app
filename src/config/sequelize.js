require("dotenv").config();
const { Sequelize } = require("sequelize");

const postgresSequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions:{
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } ,
    logging: false,
  }
);

const mssqlSequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
        port: 9000,

      },
    },
    logging: false,
  }
);

module.exports = {
  postgresSequelize,
  mssqlSequelize,
};
