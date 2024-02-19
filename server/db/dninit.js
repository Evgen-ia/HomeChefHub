const db = require("./index.js");

const createSchemaQuery = "CREATE TABLE restaurants(\
  id BIGSERIAL NOT NULL PRIMARY KEY,\
  \"name\" VARCHAR(50) NOT NULL,\
  \"location\" VARCHAR(50) NOT NULL,\
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)\
);\
CREATE TABLE reviews(\
    id BIGSERIAL NOT NULL PRIMARY KEY,\
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),\
    name VARCHAR (50) NOT NULL,\
    review TEXT NOT NULL,\
    rating INT check(rating >=1 and ratif <= 5)\
  );";

async function createSchema() {
  try {
    await db.query(createSchemaQuery);
    console.log("Database schema created successfully.");
  } catch (error) {
    console.error("Error creating database schema:", error);
  } finally {
    // Close the database connection
    db.end();
  }
}

// Call the function to create the schema
createSchema();
