const MssqlJobCost = require("../models/MssqlJobCost");
const PostgresJobCost = require("../models/PostgresJobCost");
const TableLock = require("../models/TableLock");
const { Op, Sequelize } = require("sequelize");
const {
  UPDATE_PROCESS_DAY,
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

const processUpdate = async (sourceModel, targetModel, lockId) => {
  try {
    const updateCount = await sourceModel.count();   

    console.log("update count>>>>", updateCount);

    if (updateCount > 0) {
      const batchCount = Math.ceil(updateCount / 4) || 1;

      await TableLock.update({ is_locked: true }, { where: { id: lockId } });

      await processUpdateBatch(sourceModel, targetModel, {}, batchCount); // ✅ no condition

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
          console.log("processed row id: ", rec.id);  
          const recordData = rec.toJSON();

          return targetModel.update(recordData, {
            where: { id: rec.id },   
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
  processJobCost,
  processUpdate,
  processUpdateJobCost,
  processUpdateBatch,
};
