const MssqlJobCost = require("../models/MssqlJobCost");
const PostgresJobCost = require("../models/PostgresJobCost");
const MssqlOrder = require("../models/MssqlOrder");
const MssqlInvoice = require("../models/MssqlInvoice");
const PostgresOrder = require("../models/PostgresOrder");
const PostgresInvoice = require("../models/PostgresInvoice");
const TableLock = require("../models/TableLock");
const { Op, Sequelize } = require("sequelize");
const {
  UPDATE_PROCESS_DAY,
    INVOICE_TABLE_LOCK_ID,
  JOB_HISTORY_TABLE_LOCK_ID,
  JOB_COST_TABLE_LOCK_ID,
} = require("../config/constant");
require("dotenv").config();

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE) || 1000;

const processBatch = async (model, targetModel, where, batchSize) => {
  let offset = 0;
  let moreRecords = true;
  let successCount = 0;
  console.log(`Batch process Started...................`);

  try {
    while (moreRecords) {
      const records = await model.findAll({
        where,
        offset,
        limit: batchSize,
      });
      if (records.length > 0) {
        const recordData = records.map((record) => record.toJSON());

        await targetModel.bulkCreate(recordData, {
          updateOnDuplicate: Object.keys(targetModel.rawAttributes),
        });
        offset += records.length;
        successCount += records.length;
        console.log(`Processed ${successCount} records.`);
      } else {
        moreRecords = false;
      }
    }

    console.log(`Successfully added/updated ${successCount} records.`);
    console.log(`Batch process Completed...................`);
    return successCount;
  } catch (error) {
    console.error("Error during batch processing:", error);
    throw error;
  }
};


const processJobCost = async () => {
  try {
    const lock = await TableLock.findOne({
      where: { id: 3 }, 
    });

    if (lock?.dataValues.is_locked === false) {
      const cond = await PostgresJobCost.findOne({
        order: [["id", "DESC"]],
        attributes: ["id"],
      });

      if (cond) {
        const condition = {
        id: { [Op.gt]: cond.dataValues.id }
        };

        
        await TableLock.update({ is_locked: true }, { where: { id: 3 } });

        await processBatch(
          MssqlJobCost,      
          PostgresJobCost,  
          condition,
          BATCH_SIZE
        );

        await TableLock.update({ is_locked: false }, { where: { id: 3 } });
      }
    } else {
      console.error("job cost table is locked.");
    }
  } catch (error) {
    await TableLock.update({ is_locked: false }, { where: { id: 3 } });
    console.error("Error during job cost batch processing:", error);
    throw error;
  }
};



const processUpdateJobCost = async () => {
  await processUpdate(MssqlJobCost, PostgresJobCost, JOB_COST_TABLE_LOCK_ID);
};

const processInvoice = async () => {
  try {
    const lock = await TableLock.findOne({
      where: { id: 1 },
    });
    if (lock?.dataValues.is_locked === false) {
      const cond = await PostgresInvoice.findOne({
        order: [["row_modified_on", "DESC"]],
        attributes: ["row_unique_id", "row_modified_on"],
      });
      if (cond) {
        const condition = {
          row_unique_id: { [Op.gt]: cond?.dataValues?.row_unique_id },
        };
        await TableLock.update({ is_locked: true }, { where: { id: 1 } });
        await processBatch(
          MssqlInvoice,
          PostgresInvoice,
          condition,
          BATCH_SIZE
        );
        await TableLock.update({ is_locked: false }, { where: { id: 1 } });
      }
    } else {
      console.error("ar invoice table is locked.");
    }
  } catch (error) {
    await TableLock.update({ is_locked: false }, { where: { id: 1 } });
    console.error("Error during batch processing:", error);
    throw error;
  }
};

const processJobHistory = async () => {
  try {
    const lock = await TableLock.findOne({
      where: { id: 2 },
    });
    if (lock?.dataValues.is_locked === false) {
      const cond = await PostgresOrder.findOne({
        order: [["row_modified_on", "DESC"]],
        attributes: ["row_unique_id", "row_modified_on"],
      });
      if (cond) {
        const condition = {
          row_unique_id: { [Op.gt]: cond?.dataValues?.row_unique_id },
        };
        await TableLock.update({ is_locked: true }, { where: { id: 2 } });
        await processBatch(MssqlOrder, PostgresOrder, condition, BATCH_SIZE);
        await TableLock.update({ is_locked: false }, { where: { id: 2 } });
      }
    } else {
      console.error("job history table is locked.");
    }
  } catch (error) {
    await TableLock.update({ is_locked: false }, { where: { id: 2 } });
    console.error("Error during batch processing:", error);
    throw error;
  }
};

const processUpdateInvoice = async () => {
  await processUpdate(MssqlInvoice, PostgresInvoice, INVOICE_TABLE_LOCK_ID);
};

const processUpdateJobHistory = async () => {
  await processUpdate(MssqlOrder, PostgresOrder, JOB_HISTORY_TABLE_LOCK_ID);
};


const processUpdate = async (sourceModel, targetModel, lockId) => {
  try {
     const toDate = new Date();
    const fromDate = new Date(
      toDate.getTime() - UPDATE_PROCESS_DAY * 24 * 60 * 60 * 1000
    );
    const toDateString = toDate.toISOString();
    const fromDateString = fromDate.toISOString();

    const condition = {
      row_modified_on: {
        [Op.gte]: Sequelize.fn(
          "CONVERT",
          Sequelize.literal(`DATETIME, '${fromDateString}'`)
        ),
        [Op.lte]: Sequelize.fn(
          "CONVERT",
          Sequelize.literal(`DATETIME, '${toDateString}'`)
        ),
      },
    };

    const updateCount = await sourceModel.count({
      where: condition,
    });  

    console.log("update count>>>>", updateCount);

    if (updateCount > 0) {
      const batchCount = Math.ceil(updateCount / 4) || 1;

      await TableLock.update({ is_locked: true }, { where: { id: lockId } });

      await processUpdateBatch(sourceModel, targetModel, condition, batchCount); // ✅ no condition

      await TableLock.update({ is_locked: false }, { where: { id: lockId } });
    }
  } catch (error) {
    await TableLock.update({ is_locked: false }, { where: { id: lockId } });
    console.error(`Error during process update for lockId ${lockId}:`, error);
    throw error;
  }
};


const processUpdateBatch = async (model, targetModel, where, batchSize) => {
  let offset = 0;
  let moreRecords = true;
  let successCount = 0;
  console.log(`Update batch process Started...................`);

  try {
    while (moreRecords) {
      const records = await model.findAll({
        where,
        offset,
        limit: batchSize,
      });

      if (records.length > 0) {
      const updatePromises = records.map(async (rec) => {
      const recordData = rec.toJSON();
      const whereClause = rec.row_unique_id
        ? { row_unique_id: rec.row_unique_id }
        : { id: rec.id };
      console.log(
      "processed row: ",
      rec.row_unique_id ? rec.row_unique_id : rec.id
    );
    return targetModel.update(recordData, {
      where: whereClause,
    });
  });
 
        await Promise.all(updatePromises);
        offset += records.length;
        successCount += records.length;
        console.log(`Processed ${successCount} records.`);
      } else {
        moreRecords = false;
      }
    }

    console.log(`Successfully added/updated ${successCount} records.`);
    console.log(`Batch process Completed...................`);
    return successCount;
  } catch (error) {
    console.error("Error during processUpdateBatch processing:", error);
    throw error;
  }
};

module.exports = {
  processBatch,
  processInvoice,
  processJobHistory,
  processJobCost,
  processUpdate,
  processUpdateInvoice,
  processUpdateJobHistory,
  processUpdateJobCost,
  processUpdateBatch,
};
