require("dotenv").config();
const express = require("express");
const db = require("./db/index.js");
// const morgan = require("morgan");
// const { query } = require("express");

console.log("i'm here outside");

const cors = require("cors")

// app.use(morgan("dev"));

// app.use((req, res, next)=> {
//     next();
// })
const app = express();




const createSchemaQuery = 
"DROP TABLE IF EXISTS Extra;\
CREATE TABLE IF NOT EXISTS restaurants(\
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
    rating INT check(rating >=1 and rating <= 5)\
  );";

async function createExtra() {
  try {
    await db.query(createSchemaQuery);
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating database extra:", error);
  } finally {
    // db.end();
  }
}

createExtra();


app.use(cors());
app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode}`);
  next();
};

app.use(loggerMiddleware);


// get the list of restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    console.log("i'm here inside");
    try {
        // const results = await db.query("SELECT * from restaurants");
        // console.log(results);
        // "SELECT * FROM restaurants left join (select restaurant_id, COUNT(*) TRUNC(AVG(rating),1) as avarage_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
        const RestRatingData = await db.query(
          "SELECT * FROM restaurants\
            LEFT JOIN (\
            SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating\
            FROM reviews\
            GROUP BY restaurant_id\
        ) reviews ON restaurants.id = reviews.restaurant_id;");
        console.log("RestRatingData(.row =restaurant, нужен key для среднего)",RestRatingData.rows);
        res.json({
            status: 'success',
            results: RestRatingData.rows.length,
            data: {
                restaurant: RestRatingData.rows,
            },
        });
    } catch (err) { console.log(err); }
});

// get the restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    // select * from restaurants wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
  
    try {
      const results = await db.query(
        "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );
      console.log("create rest results",results);
      res.status(201).json({
        status: "succes",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
  
// update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
      const results = await db.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );
  
      res.status(200).json({
        status: "succes",
        data: {
          retaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
  });

// delete
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
      const results = db.query("DELETE FROM restaurants where id = $1", [
        req.params.id,
      ]);
      res.status(204).json({
        status: "sucess",
      });
    } catch (err) {
      console.log(err);
    }
  });

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
        "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
        status: "success",
        data: {
            review: newReview.rows[0],
        },
        });
    } catch (err) {
        console.log(err);
    }
});


const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`up and listening on ${port}`);
});

