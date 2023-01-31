app.use(express.json());
app.route('/pets')
    .get( async (req, res) => {
        try {
            const result = await client.query(' '); // SELECT * FROM __
            res.status(200).type('application/json').json(result.rows)
        } catch(error) {
            res.status(500).type('text/plain').send(error)
        }      
    .post(async (req, res) => {
        let { body }  = req
        if (createPetValidation(body)) {
            try {
                const result = await client.query(' ', [ ]) // INSERT INTO ( ___ ) VALUES ( ___ )
                res.status(200).type('application/json').json(body)
            } catch(error) {
                res.status(500).type('text/plain').send(error) 
            };
        } else {
            res.status(400).type('text/plain').send("Bad Request")
        }        
    })
app.route('/pets/:id')
    })
    .get( async (req, res) => {
        const id = req.params.id
        try {
            const result = await client.query(' ', [id]) // SELECT * FROM ___ WHERE ___ = $1
            res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }      
})   
    .put(async (req, res) => {
        const id = req.params.id
        let { body }  = req
        if (putPetValidation(body)) {
            try {
                const result = await client.query('', [body.name, id])
                res.status(200).type('application/json').json(body)
            } catch(error) {
                    res.status(500).type('text/plain').send(error) 
                };
            } else {
                res.status(400).type('text/plain').send("Bad Request")
            }        
        })
    .delete(async (req, res) => {
        const id = req.params.id
        try {
            const result = await client.query('DELETE FROM pets WHERE pet_id = $1', [id])
            res.status(200).type('application/json').json('PET DELETE AT $1', [id])
        } catch(error) {
            res.status(500).type('text/plain').send(error)
        };
    })

// Responds with error if no routes are hit WHY???
app.use((req, res) => {
    res.status(404).type('text/plain').send('Not found')
})



// Create Pet Object Validation 
function createPetValidation(obj) {
    let age = false;
    let kind = false;
    let name = false;
    for (key in obj) {
        if (key === 'age' && (typeof obj[key]) === 'number' && obj[key] !== null) {
            age = true;
        } else if (key === 'kind' && obj[key] !== '') {
            kind = true;
        } else if (key === 'name' && obj[key] !== '') {
            name = true;
        }
    }
    if (age && kind && name) {
        return true
    } else return false
}
// Patch Pet Object Validation CHANGE THIS TO PUT!!!
function putPetValidation(obj) { //
    let age = false;
    let kind = false;
    let name = false;
    for (key in obj) {
        if (key === 'age' && obj[key] != '' && !isNaN(obj[key])) {
            age = true;
        } else if (key === 'kind' && obj[key] != '') {
            kind = true;
        } else if (key === 'name' && obj[key] != '') {
            name = true;
        }
    }
    if (age || kind || name) {
        return true
    } else return false
} 