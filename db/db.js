import pkg from "pg"
const {Pool} = pkg
const connectionString = process.env.DATABASE_URL
//SYNTAX PLEASE!!!
// const client = new Pool({
//     connectionString,
// })
const client = new Pool({
    user: "matt",
    password: "volleyball",
    host: "localhost",
    port: 5432,
    database: "matchpoint_db"
})
export {client}