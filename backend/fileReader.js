const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const fileReaderAsync = async (filePath) => {
  try {
    return await readFile(filePath);
  } catch (error) {
    console.error(`File reading error: ${error.message}`);
  }
};

const fileWriteAsync = async (filePath, order) => {
  try {
    const orderHistory = await fileReaderAsync(filePath);
    const orderFile = JSON.parse(orderHistory);
    const lastID = orderFile.order[orderFile.order.length - 1] ? orderFile.order[orderFile.order.length - 1].id : 0;
    order = JSON.parse(order);
    order.id = lastID + 1;

    orderFile.order.push(order);
    await writeFile(filePath, JSON.stringify(orderFile, null, 4));
    return { status: "done" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fileReaderAsync, fileWriteAsync };
