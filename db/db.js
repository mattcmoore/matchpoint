const { Pool } = require('pg')

export const client = new Pool({
    user: " ", // database username
    password: " ", // database password
    host: " ", // host name
    port: 5432, // default port
    database: " " //db name
})

// module.exports = client;