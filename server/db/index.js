const { Pool } = require("pg");

// const pool = new Pool();
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };

const connectionString = 'postgres://username:password@hostname:port/database_name';

const pool = new Pool({
  connectionString: connectionString,
});