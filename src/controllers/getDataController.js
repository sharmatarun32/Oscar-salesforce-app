const PostgresJobCost = require("../models/PostgresJobCost");
const PostgresInvoice = require("../models/PostgresInvoice");
const PostgresOrder = require("../models/PostgresOrder");
const { Op } = require("sequelize");
const {
  processInvoice,
  processJobHistory,
  processUpdateInvoice,
  processUpdateJobHistory,
  processJobCost,
  processUpdateJobCost,
} = require("../scripts/cronFunctions");
const { getPageAndLimit } = require("../scripts/helper");

async function runJobCostData(req, res) {
  try {
    await processInvoice();
    await processUpdateInvoice();
    await processJobCost();
    await processUpdateJobCost();    
    return res.status(200).json("completed!");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

async function runJobHistory(req, res) {
  try {
    await processJobHistory();
    await processUpdateJobHistory();
    return res.status(200).json("completed!");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

async function getInvoiceData(req, res) {
  try {
    const { fromDate, toDate, ...param } = req.query;
    const { skip, limit, page } = getPageAndLimit(param);

    const dataCount = await PostgresInvoice.count({
      where: {
        row_modified_on: {
          [Op.gte]: fromDate,
          [Op.lte]: toDate,
        },
      },
    });
    let data;
    if (dataCount > 0) {
      data = await PostgresInvoice.findAll({
        where: {
          row_modified_on: {
            [Op.gte]: fromDate,
            [Op.lte]: toDate,
          },
        },
        order: [["row_modified_on", "DESC"]],
        offset: skip,
        limit,
        attributes: [
          "invoice_no",
          "posted_flag",
          "customer_no",
          "description",
          "invoice_date",
          "transaction_date",
          "post_date",
          "estimate_no",
          "job_no",
          "invoice_amount",
          "customer_id",
          "estimate_id",
          "invoice_id",
          "job_id",
          "release_retainage_amount",
          "original_release_retainage_amount",
          "adjust_release_retainage_amount",
          "adjust_amount_due",
          "original_invoice_amount",
          "row_unique_id",
          "row_modified_on",
        ],
      });
    }
    const result = {
      data,
      total: dataCount || 0,
      page,
      limit,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}


async function getJobHistory(req, res) {
  const { fromDate, toDate, ...param } = req.query;
  const { skip, limit, page } = getPageAndLimit(param);
  const dataCount = await PostgresOrder.count({
    where: {
      row_modified_on: {
        [Op.gte]: fromDate,
        [Op.lte]: toDate,
      },
    },
  });
  let data;
  if (dataCount > 0) {
    data = await PostgresOrder.findAll({
      where: {
        row_modified_on: {
          [Op.gte]: fromDate,
          [Op.lte]: toDate,
        },
      },
      order: [["row_modified_on", "DESC"]],
      offset: skip,
      limit,
      attributes: [
        "job_no",
        "earn_type_no",
        "cost_class_no",
        "date_booked",
        "transaction_no",
        "date_posted",
        "cost",
        "units",
        "quantity",
        "vendor_no",
        "job_id",
        "vendor_id",
        "datetime_posted",
        "row_unique_id",
        "row_modified_on",
      ],
    });
  }
  const result = {
    data,
    total: dataCount || 0,
    page,
    limit,
  };
  return res.status(200).json(result);
}

async function getJobCostData(req, res) {
  try {
    const { skip, limit, page } = getPageAndLimit(req.query);
    const dataCount = await PostgresJobCost.count();
    console.log("Total Records Count:", dataCount);

    let data;
    if (dataCount > 0) {
      data = await PostgresJobCost.findAll({
        order: [["id", "DESC"]],
        offset: skip,
        limit,
        attributes: [
          "id",
          "parent_id",
          "company_no",
          "original_line_no",
          "job_no",
          "phase_no",
          "cost_code_no",
          "cost_class_no",
          "amount",
          "account_no",
          "div_level_1",
          "div_level_2",
          "div_level_3",
          "div_level_4",
          "units",
          "description",
          "tax_flag",
          "tax_base",
          "tax_no",
          "tax_rate",
          "tax_amount",
          "total",
          "use_tax",
          "eq_wo_no",
          "equip_no",
          "service_code_no",
        ],
      });

      console.log("Sample Records:", JSON.stringify(data.slice(0, 5), null, 2));
    }

    const result = {
      data,
      total: dataCount || 0,
      page,
      limit,
    };

    console.log("Final Response:", JSON.stringify(result, null, 2));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getJobCostData:", error);
    return res.status(500).json(error);
  }
}



module.exports = {
  runInvoiceData,
  runJobHistory,
  getInvoiceData,
  getJobHistory,
  runJobCostData,
  getJobCostData,
};
