const { DataTypes } = require("sequelize");
const { mssqlSequelize } = require("../config/sequelize");

const MssqlInvoice = mssqlSequelize.define(
  "ar_invoice",
  {
    company_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_source: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    invoice_no: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true,
    },
    posted_flag: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    customer_no: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(30),
    },
    invoice_date: {
      type: DataTypes.DATE,
    },
    transaction_date: {
      type: DataTypes.DATE,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    discount_date: {
      type: DataTypes.DATE,
    },
    post_date: {
      type: DataTypes.DATE,
    },
    closed_date: {
      type: DataTypes.DATE,
    },
    estimate_no: {
      type: DataTypes.STRING(30),
    },
    job_no: {
      type: DataTypes.CHAR(10),
    },
    tax_no: {
      type: DataTypes.CHAR(5),
    },
    invoice_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    amount_due: {
      type: DataTypes.NUMERIC(12, 2),
    },
    retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    discount_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    use_tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_invoice_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_amount_due: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_discount_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_amount_due: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_discount_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_use_tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    gl_ar: {
      type: DataTypes.NUMERIC(12, 0),
    },
    gl_retainage: {
      type: DataTypes.NUMERIC(12, 0),
    },
    discount_percent: {
      type: DataTypes.NUMERIC(12, 5),
    },
    retainage_percent: {
      type: DataTypes.NUMERIC(12, 5),
    },
    release_retainage_percent: {
      type: DataTypes.NUMERIC(12, 5),
    },
    release_retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    hidden_sales_tax: {
      type: DataTypes.CHAR(1),
    },
    aia_section_no: {
      type: DataTypes.CHAR(10),
    },
    closed_flag: {
      type: DataTypes.CHAR(1),
    },
    hold_flag: {
      type: DataTypes.CHAR(1),
    },
    income_type_no: {
      type: DataTypes.CHAR(10),
    },
    service_charge: {
      type: DataTypes.CHAR(1),
    },
    invoice_type: {
      type: DataTypes.CHAR(1),
    },
    original_invoice_no: {
      type: DataTypes.CHAR(10),
    },
    purge_reversal: {
      type: DataTypes.CHAR(1),
    },
    cash_receipt_no: {
      type: DataTypes.INTEGER,
    },
    record_status: {
      type: DataTypes.CHAR(1),
    },
    row_modified_by: {
      type: DataTypes.STRING(32),
    },
    row_modified_on: {
      type: DataTypes.DATE,
    },
    row_unique_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    original_use_tax_base: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_invoice_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_adjustment_no: {
      type: DataTypes.CHAR(10),
    },
    printable_invoice: {
      type: DataTypes.CHAR(1),
    },
    design_no: {
      type: DataTypes.INTEGER,
    },
    terms_no: {
      type: DataTypes.CHAR(5),
    },
    gl_tax: {
      type: DataTypes.NUMERIC(12, 0),
    },
    reversal: {
      type: DataTypes.CHAR(1),
    },
    use_retainage: {
      type: DataTypes.CHAR(1),
    },
    original_retainage_percent: {
      type: DataTypes.NUMERIC(12, 5),
    },
    original_release_retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    adjust_release_retainage_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    provider: {
      type: DataTypes.CHAR(5),
    },
    aia_section_id: {
      type: DataTypes.STRING(10),
    },
    cash_receipt_id: {
      type: DataTypes.STRING(10),
    },
    company_id: {
      type: DataTypes.STRING(10),
    },
    customer_id: {
      type: DataTypes.STRING(10),
    },
    design_id: {
      type: DataTypes.STRING(10),
    },
    estimate_id: {
      type: DataTypes.STRING(30),
    },
    income_type_id: {
      type: DataTypes.STRING(10),
    },
    invoice_id: {
      type: DataTypes.STRING(10),
    },
    job_id: {
      type: DataTypes.STRING(10),
    },
    original_adjustment_id: {
      type: DataTypes.STRING(10),
    },
    original_invoice_id: {
      type: DataTypes.STRING(10),
    },
    tax_id: {
      type: DataTypes.STRING(10),
    },
    terms_id: {
      type: DataTypes.STRING(10),
    },
    tm_reversal_mode: {
      type: DataTypes.CHAR(1),
    },
    update_inventory: {
      type: DataTypes.CHAR(1),
    },
    printable_invoice_entry: {
      type: DataTypes.CHAR(1),
    },
    include_in_percent_complete: {
      type: DataTypes.CHAR(1),
    },
    service_charge_eligible: {
      type: DataTypes.CHAR(1),
    },
    service_charge_based_on: {
      type: DataTypes.CHAR(1),
    },
    proposal_flag: {
      type: DataTypes.CHAR(1),
    },
    proposal_status: {
      type: DataTypes.CHAR(1),
    },
    from_invoice_no: {
      type: DataTypes.CHAR(10),
    },
    from_invoice_id: {
      type: DataTypes.STRING(10),
    },
    recurring_flag: {
      type: DataTypes.CHAR(1),
    },
    recurring_invoice_no: {
      type: DataTypes.CHAR(10),
    },
    recurring_frequency: {
      type: DataTypes.CHAR(1),
    },
    recurring_start_date: {
      type: DataTypes.DATE,
    },
    recurring_end_flag: {
      type: DataTypes.CHAR(1),
    },
    recurring_occurrences: {
      type: DataTypes.INTEGER,
    },
    recurring_end_date: {
      type: DataTypes.DATE,
    },
    from_invoice_source: {
      type: DataTypes.CHAR(1),
    },
    recurring_generate_invoice: {
      type: DataTypes.CHAR(1),
    },
    recurring_invoice_id: {
      type: DataTypes.STRING(10),
    },
    aia_invoice: {
      type: DataTypes.CHAR(1),
    },
    up_bid_no: {
      type: DataTypes.CHAR(10),
    },
    up_bid_id: {
      type: DataTypes.STRING(10),
    },
    ship_to_no: {
      type: DataTypes.CHAR(10),
    },
    ship_to_id: {
      type: DataTypes.STRING(10),
    },
    payment_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    payment_type: {
      type: DataTypes.CHAR(2),
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    check_number: {
      type: DataTypes.STRING(20),
    },
    sb_unique_idn: {
      type: DataTypes.STRING(10),
    },
    deposit_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    deposit_type: {
      type: DataTypes.CHAR(2),
    },
    deposit_date: {
      type: DataTypes.DATE,
    },
    deposit_check_number: {
      type: DataTypes.STRING(20),
    },
    payment_gl: {
      type: DataTypes.NUMERIC(12, 0),
    },
    deposit_gl: {
      type: DataTypes.NUMERIC(12, 0),
    },
    payment_to_holding_account: {
      type: DataTypes.CHAR(1),
    },
    deposit_to_holding_account: {
      type: DataTypes.CHAR(1),
    },
    payment_discount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    tax_by_effdate_flag: {
      type: DataTypes.CHAR(1),
    },
    state_tax_percent: {
      type: DataTypes.NUMERIC(11, 7),
    },
    state_taxable_limit: {
      type: DataTypes.NUMERIC(12, 2),
    },
    state_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    local_tax_percent: {
      type: DataTypes.NUMERIC(11, 7),
    },
    local_taxable_limit: {
      type: DataTypes.NUMERIC(12, 2),
    },
    local_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    other_tax_percent: {
      type: DataTypes.NUMERIC(11, 7),
    },
    other_taxable_limit: {
      type: DataTypes.NUMERIC(12, 2),
    },
    other_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    payment_description: {
      type: DataTypes.STRING(30),
    },
    sd_contract_string: {
      type: DataTypes.STRING(20),
    },
    sd_renewal_num: {
      type: DataTypes.INTEGER,
    },
    sd_bill_num: {
      type: DataTypes.INTEGER,
    },
    original_tax_tracked: {
      type: DataTypes.CHAR(1),
    },
    original_state_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_local_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    original_other_tax_amount: {
      type: DataTypes.NUMERIC(12, 2),
    },
    internal_batch_number: {
      type: DataTypes.INTEGER,
    },
    quick_reversal: {
      type: DataTypes.CHAR(1),
    },
  },
  {
    tableName: "ar_invoice",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MssqlInvoice;
