const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { exit } = require("process");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const startingContent = "make/write up some block of content for this starting page.";
const aboutContent = "this is the place to read the blogs of apb-the-journalist.";
const contactContent = "this is the place where you will get to know about reaching out to me.";

const postCollection = [];

app.get("/", function (req, res) {
    // res.write("my-blog");
    // res.send();
    res.render("home", {sContent: startingContent, posts: postCollection});
});

app.get("/about", function (req, res) {
    res.render("about", {aContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {cContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    var jTitle = req.body.journalTitle;
    var jContent = req.body.journalContent;
    // console.log(jTitle, jContent);
    
    var post = {
        title : jTitle,
        content : jContent
    };
    // console.log(post.title);

    postCollection.push(post);
    // console.log(postCollection);

    res.redirect("/");

});

app.get("/posts/:postName", function (req, res) {
    // console.log(req.params, req.params.postName);
    // var requestedTitle = req.params.postName;
    var requestedTitle = _.lowerCase(req.params.postName);

    postCollection.forEach(function (post) {
        var availableTitle = _.lowerCase(post.title);
        if (availableTitle === requestedTitle) {
            console.log("Match Found");
            res.render("post", {title: post.title, content: post.content});
            
        } else {
            console.log("Match Not Found");
            // res.write("such a page not available");
            // res.send();
        }
    });

    // if (postCollection[postCollection.length - 1].title === requestedTitle) {
    //     console.log("Match Found");
    // }

});

app.listen(3000, function () {
    console.log("server available at port 3000");
});