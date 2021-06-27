async function createTable(client) {
    try {
        const res = await client.query(`CREATE TABLE IF NOT EXISTS todo (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255)
        )`);
        if (res) {
            console.log(`created Table`);
        }
    } catch (err) {
        console.log(err);
    }
}

//get all to do list
async function getToDoList(client) {
    try {
        const { rows } = await client.query(`SELECT * FROM todo ORDER BY id`);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

// add new to do item
async function addToDoItem(client, description) {
    try {
        const { rows } = await client.query(
            `INSERT INTO todo (description) VALUES ($1) RETURNING *`,
            [description]
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}

// get specific id to do item
async function getToDoItem(client, id) {
    try {
        const { rows } = await client.query(
            `SELECT * FROM todo where id = $1`,
            [id]
        );
        if (rows) {
            return rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
}

// update a to do
async function updateToDoItem(client, id, description) {
    try {
        const { rows } = await client.query(
            `UPDATE todo SET description = $1 where id = $2 RETURNING *`,
            [description, id]
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}

// delete a to-do
async function deleteToDoItem(client, id) {
    try {
        const { rows } = await client.query(
            `DELETE FROM todo WHERE id = $1 RETURNING *;`,
            [id]
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createTable,
    getToDoList,
    addToDoItem,
    getToDoItem,
    updateToDoItem,
    deleteToDoItem,
};
