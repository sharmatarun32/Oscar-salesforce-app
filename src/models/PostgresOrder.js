const { DataTypes } = require("sequelize");
const { postgresSequelize } = require("../config/sequelize");

const PostgresOrder = postgresSequelize.define(
  "job_history",
  {
    company_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sequence_no: {
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
    date_booked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    job_trx_type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    trade_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    earn_type_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    transaction_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    line_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_posted: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_week_ended: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    account_wip: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: true,
    },
    account_cr: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    cost: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    units: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.DECIMAL(16, 7),
      allowNull: true,
    },
    percentage: {
      type: DataTypes.DECIMAL(11, 7),
      allowNull: true,
    },
    unit_price: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: true,
    },
    unit_cost: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: true,
    },
    item_no: {
      type: DataTypes.CHAR(16),
      allowNull: true,
    },
    vendor_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    module_from: {
      type: DataTypes.CHAR(3),
      allowNull: true,
    },
    warehouse_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    equipment_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    voucher_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usage_type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    description_1: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    description_2: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    employee_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    ar_invoice_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    op_invoice_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    tm_invoice_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    cash_trx_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_trx_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    eqp_trx_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cost_code_method: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    record_status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    row_modified_by: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    row_modified_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    row_unique_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    journal_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    unit_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    inventory_quantity: {
      type: DataTypes.DECIMAL(16, 7),
      allowNull: true,
    },
    ar_invoice_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    cash_trx_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    company_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    cost_class_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    cost_code_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    earn_type_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    employee_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    eqp_trx_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    equipment_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    item_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    job_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    job_trx_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    journal_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    line_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    op_invoice_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    phase_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    sequence_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tm_invoice_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    trade_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    unit_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    vendor_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    voucher_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    warehouse_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tm_gathered: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    tm_worksheet_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    tm_markup_category: {
      type: DataTypes.CHAR(2),
      allowNull: true,
    },
    tm_markup_line: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tm_inv_row_unique_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tm_worksheet_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tm_unit_price: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: true,
    },
    tm_price_level_no: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    Qty_Upd_Trx_No: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Qty_Upd_Seq_No: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tm_price_level_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    qty_upd_trx_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    qty_upd_seq_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    dept_no: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    dept_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    ovhd_gathered: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    update_row_unique_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fuel_trx_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fuel_trx_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    prev_allocate_flag: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    ap_audit_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ap_chk_trx_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pr_burden_dtl: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    Batch_No: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    record_guid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    datetime_posted: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    correction_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    voucher_line_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "job_history",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = PostgresOrder;
