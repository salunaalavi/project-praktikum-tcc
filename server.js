const express = require("express");
const morgan = require("morgan");

const db = require("./db");
const db2 = require("./db2.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
  const users = await db.select().from("users");
  res.json(users);
});

app.get("/posts", async (req, res) => {
  const posts = await db2.select().from("posts");
  res.json(posts);
});

app.post("/users", async (req, res) => {
  const user = await db("users").insert({ name: req.body.name }).returning("*");
  res.json(user);
});

app.post("/posts", async (req, res) => {
  const post = await db2("posts").insert({
    title: req.body.title,
    body: req.body.body,
  }).returning("*");
  res.json(post);
});

app.put("/users/:id", async (req, res) => {
  const user = await db("users")
    .where({ id: req.params.id })
    .update({ name: req.body.name })
    .returning("*");
  res.json(user);
});

app.put("/posts/:id", async (req, res) => {
  const post = await db2("posts")
    .where({ id: req.params.id })
    .update({ title: req.body.title, body: req.body.body })
    .returning("*");
  res.json(post);
});

app.delete("/users/:id", async (req, res) => {
  const user = await db("users")
    .where({ id: req.params.id })
    .del()
    .returning("*");
  res.json(user);
});

app.delete("/posts/:id", async (req, res) => {
  const post = await db2("posts")
    .where({ id: req.params.id })
    .del()
    .returning("*");
  res.json(post);
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
