import express from "express"
const app = express()
import {client} from "./db/db.js"
const port = process.env.PORT || 8000
import cors from "cors"

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.get("/locations", async (_, res) => {
    try {
        const result = await client.query('SELECT * FROM locations') 
        res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }          
})
app.get("/locations/:id", async (req, res) => {
    const { id } = req.params
    try {
        const result = await client.query('SELECT * FROM locations WHERE id = $1',[id]) 
        res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }
})
app.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).type('application/json').send(JSON.stringify(req.body))
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }  
})
app.post("/courts",  async (req, res) => {
    let loc = req.body.location_id
    try {
        const result = await client.query('SELECT court_name, id FROM courts WHERE location_id = $1',[loc])
        res.status(200).type('application/json').send(JSON.stringify(result))
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }  
})
// app.post("/reservations",  async (req, res) => {
//     let {court_id,user_id,date,time} = req.body
//     try {
//         const result = await client.query(,[court_id,user_id,date,time])
//         res.status(200).type('application/json').send(JSON.stringify(result))
//     } catch(error) {
//         res.status(500).type('text/plain').send(error)
//     }  
// })


// Server Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})