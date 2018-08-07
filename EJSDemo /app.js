const express = require ("express");
const app     = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render("home");
});

app.get("/fallinlovewith/:thing",  (req,res) => {
    const thing = req.params.thing;
    res.render("love",{thingVar:thing });
});

app.get("/posts",  (req,res) => {
    const posts = [
        {title:"post1", author:"Suzy"},
        {title:"my adorable cat", author:"Charlie"},
        {title:"hello world!", author:"Firat"}
        ];
    res.render("posts", {posts:posts });
});

app.listen(3000,'localhost',  () =>{
    console.log("Server is listening!!!");
});