const { DataTypes } = require("sequelize");
const { postgresSequelize } = require("../config/sequelize");

const TableLock = postgresSequelize.define(
  "table_lock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    t_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    is_locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    tableName: "table_lock",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TableLock;
