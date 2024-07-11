import express from "express"; // Agar type: "module" mavjud bo'lsa
// const express = require('express'); // Agar type: "module" yo'q bo'lsa

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("Hello World!");
});

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },

  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
  { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com" },
  { id: 6, name: "David Wilson", email: "david.wilson@example.com" },
  { id: 7, name: "Emily Thompson", email: "emily.thompson@example.com" },
  { id: 8, name: "Frank Austin", email: "frank.austin@example.com" },
];

// Barcha foydalanuvchilarni qaytarish
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.send(users);

  if (filter && value) {
    return res.send(
      users.filter((user) =>
        user[filter].toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  return res.status(400).send({ msg: "Invalid query parameters" });
});

///post action
app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(newUser);
});
app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId))
    return res.status(404).send({ msg: "Invalid id passed to API request" });

  const user = users.find((user) => user.id === parsedId);
  if (!user) return res.sendStatus(404);
  return res.send(user);
});

//put actions

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(404);
  const findIndexOfUser = users.findIndex((user) => user.id === parsedId);
  if (findIndexOfUser === -1) return res.sendStatus(404);
  users[findIndexOfUser] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

//patch action

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(404);
  if (isNaN(parsedId)) return res.sendStatus(404);
  const findIndexOfUser = users.findIndex((user) => user.id === parsedId);
  if (findIndexOfUser === -1) return res.sendStatus(404);
  users[findIndexOfUser] = { ...users[findIndexOfUser], ...body };
  return res.sendStatus(200);
});

///delete action

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const initialLength = users.length;
  users = users.filter((user) => user.id !== parsedId);

  if (users.length === initialLength) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
