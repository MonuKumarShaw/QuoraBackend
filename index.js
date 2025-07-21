const express = require("express");
const app = express();

const port = process.env.PORT || 8080; // ✅ Use dynamic port for Render
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const { v4: uuidv4 } = require('uuid');

// Sample posts array (in-memory)
let posts = [
    {
        id: uuidv4(),
        username: "MonuKumarShaw",
        content: "I am a Web Developer and I create Websites!"
    },
    {
        id: uuidv4(),
        username: "GautamKumarShaw",
        content: "I am a Data Analyst and I manage data!"
    },
    {
        id: uuidv4(),
        username: "SonuSharma",
        content: "Hi, I am a Software Developer!"
    }
];

// Root route to check if live
app.get("/", (req, res) => {
    res.send("Quora REST API Backend is Live 🚀");
});

// Display all posts
app.get("/post", (req, res) => {
    res.render("index.ejs", { posts });
});

// Form to add new post
app.get("/post/new", (req, res) => {
    res.render("new.ejs");
});

// Handle creation of new post
app.post("/post", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/post");
});

// View single post
app.get("/post/:id", (req, res) => {
    let { id } = req.params;
    const post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found.");
    }
    res.render("show.ejs", { post });
});

// Form to edit post
app.get("/post/:id/edit", (req, res) => { // ✅ lowercase "edit"
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found.");
    }
    res.render("edit.ejs", { post });
});

// Update post
app.patch("/post/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find((p) => p.id === id);
    if (post) {
        post.content = content;
    }
    res.redirect("/post");
});

// Delete post
app.delete("/post/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/post");
});

// Start server
app.listen(port, () => {
    console.log(`App is Listening on port ${port}`);
});
