// Required dependencies
import {} from "dotenv"
import express from "express"
const app = express()
import cors from "cors"
import {client} from "./db/db.js"
const port = process.env.PORT || 8000

app.use(express.static("public"))
// app.use(cors({
//     origin: 'localhost'
// }))

app.get("/locations", async (matchpoint_db, res) => {
    try {
        const result = await client.query('SELECT * FROM locations') 
        res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }          
});

// Server Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})