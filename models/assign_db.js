const { client } = require("./connecter.js");
const util = require("util");

const exe_query = async (que) => {
  client.connect();
  console.log(que);
  const q = util.promisify(client.query).bind(client);
  try {
    console.log(que);
    const result = await q(que);
    client.end();
    return result.rows;
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

module.exports = { exe_query };
