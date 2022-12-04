const fs = require("fs/promises");

module.exports = async function getInput(dir) {
  const f = await fs.readFile(dir + "/input.txt", { encoding: "utf-8" });
  return f.trim();
};
