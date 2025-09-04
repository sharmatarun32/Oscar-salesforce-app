const PostgresJobCost = require("../models/PostgresJobCost");
const { Op } = require("sequelize");
const {
  processJobCost,
  processUpdateJobCost,
} = require("../scripts/cronFunctions");
const { getPageAndLimit } = require("../scripts/helper");

async function runJobCostData(req, res) {
  try {
    await processJobCost();
    await processUpdateJobCost();    
    return res.status(200).json("completed!");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
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
  runJobCostData,
  getJobCostData,
};
