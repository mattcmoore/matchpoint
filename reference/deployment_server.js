// import * as dotenv from "dotenv";
import {} from 'dotenv'
import express from "express"
import morgan from "morgan"
import postgres from "postgres"
const port = process.env.PORT
// dotenv.config()

// TODO: Uncomment the following two lines.
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

// TODO: Replace with process.env.DATABASE_URL
// Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
const sql = postgres(process.env.DATABASE_URL);

app.use(express.static("public"));

app.get("/api/students", (_, res) => {
  sql`SELECT * FROM student`.then((data) => {
    res.json(data);
  });
});

// TODO: Replace 3000 with process.env.PORT
app.listen(port, () => {
  console.log(`listening on Port ${port}`);
});
