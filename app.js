//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to my world of creativity and passion! This blog is a celebration of all things anime, designing, and web development. Join me as we embark on an exciting journey through the captivating realms of animation, where we'll explore the beauty of storytelling and the artistry behind each frame.Unleash your imagination as we dive into the fascinating world of design, from striking visuals to user-centric experiences that leave a lasting impact. I'll share tips, tricks, and inspiration to help you craft your own artistic masterpieces.But that's not all – we'll also venture into the ever-evolving universe of web development. From coding wizardry to cutting-edge technologies, together, we'll unravel the secrets of creating stunning websites and powerful web applications.Whether you're an anime enthusiast seeking new series recommendations or a creative mind eager to master design and web development, this blog is your ultimate destination. So, buckle up and let's set off on this adventure of boundless creativity!";

const aboutContent = "Welcome to my blog! Here, I explore the enthralling realms of anime, designing, and web development, combining my passions into a captivating fusion of creativity. From in-depth anime reviews and design tutorials to cutting-edge web development insights, join me on a journey that celebrates the artistry, innovation, and endless possibilities in these three captivating domains. Let's embark on this adventure together and unlock the boundless potential of imagination and technology!";
const contactContent = "Got a burning question, exciting collaboration idea, or just want to geek out about anime, designing, or web development? I'd love to hear from you! Drop me a line using the form below and let's connect over our shared passions. Whether you're an anime aficionado, a design enthusiast, or a web dev wizard, this is the place to reach out. Looking forward to chatting with you!";
let posts=[];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{homestart:homeStartingContent,postslist:posts});
})
app.get("/about",function(req,res){
  res.render("about",{aboutpage:aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact",{contactpage:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose");
})
app.get("/posts/:Postname",function(req,res){
  const requested=_.lowerCase(req.params.Postname);
  posts.forEach(function(post){
    const storedtitle=post.title;
    const storetitle=_.lowerCase(storedtitle);
    const storedcontent=post.content;
    if(requested==storetitle){
      console.log("match found");
      res.render("post",{
        tagposttitle:storedtitle,
        tagcontent:storedcontent
      });
    }
  })
  
})

app.post("/compose",function(req,res){
  // let a =req.body.article;
  // let b =req.body.con;
  // console.log(a);
  // console.log(b);
  const post={
    title:req.body.posttitle,
    content:req.body.postcontent,
  };
  posts.push(post);
  res.redirect("/");
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
