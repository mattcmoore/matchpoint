import pkg from "pg"
const {Pool} = pkg
import dotenv from "dotenv"
dotenv.config()

let connectionString = process.env.DATABASE_URL;
// const connectionString = 'postgres://matt:volleyball@localhost:5432/matchpoint_db'
//SYNTAX PLEASE!!!


const client = new Pool({
    connectionString,
});
// const client = new Pool({
//     user: "matt",
//     password: "volleyball",
//     host: "localhost",
//     port: 5432,
//     database: "matchpoint_db"
// })
export {client}