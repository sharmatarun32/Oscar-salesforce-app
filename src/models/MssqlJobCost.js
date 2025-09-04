const { DataTypes } = require("sequelize");
const { mssqlSequelize } = require("../config/sequelize");

const MssqlJobCost = mssqlSequelize.define(
  "routing_job_cost_revision_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    original_line_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    phase_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    cost_code_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    cost_class_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    account_no: {
      type: DataTypes.NUMERIC(12, 0),
      allowNull: true,
    },
    div_level_1: {
      type: DataTypes.NUMERIC(8, 0),
      allowNull: true,
    },
    div_level_2: {
      type: DataTypes.NUMERIC(8, 0),
      allowNull: true,
    },
    div_level_3: {
      type: DataTypes.NUMERIC(8, 0),
      allowNull: true,
    },
    div_level_4: {
      type: DataTypes.NUMERIC(8, 0),
      allowNull: true,
    },
    units: {
      type: DataTypes.NUMERIC(16, 3),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    tax_flag: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    tax_base: {
      type: DataTypes.NUMERIC(12, 2),
      allowNull: true,
    },
    tax_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    tax_rate: {
      type: DataTypes.NUMERIC(11, 7),
      allowNull: true,
    },
    tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
      allowNull: true,
    },
    total: {
      type: DataTypes.NUMERIC(16, 2),
      allowNull: true,
    },
    use_tax: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    eq_wo_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    equip_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    service_code_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
  },
  {
    tableName: "routing_job_cost_revision_detail",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MssqlJobCost;