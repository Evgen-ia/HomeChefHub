const { Pool } = require("pg");

// const pool = new Pool();
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };

const connectionString = 'postgres://restaurants_db_bjs4_user:eMiwZQllWGzZLnfBgMvXabszs6nfSKpL@dpg-cn9emdocmk4c739vlsd0-a/restaurants_db_bjs4';

const pool = new Pool({
  connectionString: connectionString,
});