const { Post, User } = require("../models");
const { route } = require("./api");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        })
        
        res.json(postData);
        const post = postData.map((post) => post.get({ plain: true })) 

        // handlebars

    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async (req, res) => {
    try {


    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/login", async (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/");
        return
    }
    // res.render("login")
})

router.get("/signup", async (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/");
        return
    }
    // res.render("signup")
})

module.exports = router;