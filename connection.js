require("dotenv").config();
const pg = require("pg");

// connection credentials
const pgUrl = process.env.DBURL;
const client = new pg.Client(pgUrl);

// connect to elephantSQL
async function connect(client) {
    try {
        await client.connect();
        console.log(`Client connected`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {client, connect}