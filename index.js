require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const { client, connect } = require("./connection");
const {
    createTable,
    getToDoList,
    addToDoItem,
    getToDoItem,
    updateToDoItem,
    deleteToDoItem,
} = require("./db");

connect(client);
createTable(client);
// middlewares
app.use(express.json()); //parses incoming requests with JSON payloads

// routes
app.get("/todo", async (req, res) => {
    const toDoList = await getToDoList(client);
    res.send(toDoList);
});

// add a new to do list
app.post("/todo", async (req, res) => {
    const { description } = req.body;
    const newToDoItem = await addToDoItem(client, description);
    res.send(newToDoItem);
});

// get a specified to do item
app.get("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const toDoItem = await getToDoItem(client, id);
    res.send(toDoItem);
});

// update an item in a specific to do item
app.put("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const updatedToDoItem = await updateToDoItem(client, id, description);
    res.send(updatedToDoItem);
});

// delete a todo
// TODO: testing done
app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const deletedToDoItem = await deleteToDoItem(client, id);
    res.send(deletedToDoItem);
});

app.listen(port, () => {
    console.log(`App listening to PORT ${port}`);
});

// Switching from construction industry to IT industry, I can't wait to make a leap to becoming a full stack developer, applying what I have learned in the past 1 year and continue to learn & work to make myself a better version of me and to bring values to the organization every single day
