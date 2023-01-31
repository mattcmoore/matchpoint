// Required dependencies
import {} from "dotenv"
import express from "express"
const app = express()
import {client} from "./db/db.js"
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.static("public"))

app.get("/locations", async (_, res) => {
    try {
        const result = await client.query('SELECT * FROM locations') 
        res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }          
});
app.post("/test", async (req, res) => {
    let username = await req.body.username
    let password = req.body.password
    try {
        // res.send(`Username: ${username} Password: ${password}`);
        res.send(username)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }  
    
})

// Server Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})