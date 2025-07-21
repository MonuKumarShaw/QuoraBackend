const express = require("express");
const app = express();

const port = 8080;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const path = require("path");
app.use(express.urlencoded({extended : true})); 
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// creating uuid for uniqeu id 
const { v4: uuidv4 } = require('uuid');


//creating post array to access the post as we are not using db right now
let posts =[
 
    {   
        id :uuidv4(),
        username : "MonuKumarShaw",
    content: "I am a Web Developer i create Websites!"
    },
    {
        id: uuidv4(),
        username: "GautamKumarShaw",
        content: "I am a Data Analyst i manage data!"
    },
   {
      id: uuidv4(),
    username : "SonuSharma",
    content : "Hi i am a Software developer!"
   }


];
// to get all posts
app.get("/post",(req, res)=>{
    res.render("index.ejs", {posts});
});
// to add a new post
app.get("/post/new", (req,res)=>{
    res.render("new.ejs");
});

// to add the post in the array
app.post("/post", (req, res)=>{
    let{username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/post");//  bydefault is will be on get request.
      
});
// see in detail
app.get("/post/:id",(req, res)=>{
    let {id} = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});


// to patch request means to edit the content


app.patch("/post/:id", (req, res) => {
    const { id } = req.params;
    const  content  = req.body.content; // fixed
    console.log(content);
    const post = posts.find((p) => p.id == id);
    post.content = content;
    res.redirect("/post");
    
    
});
// to edit 
app.get("/post/:id/Edit", (req,res)=>{
    const {id} = req.params;
    const post = posts.find((p) => p.id == id);
    res.render("Edit.ejs",{post});
});

//to delete post
app.delete("/post/:id", (req,res)=>{
    const {id} = req.params;
    posts = posts.filter((p)=> p.id != id);
    res.redirect("/post");
})


app.listen(port, ()=>{
    console.log("App is Listening on port 8080");
});