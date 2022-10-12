const { Post, User } = require("../models");
const { route } = require("./api");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        })
        
        const posts = postData.map((post) => post.get({ plain: true })) 
        res.render("all-posts", { posts })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk({
            include: [User, {
                model: Comment,
                include: [User]
            }]
        })
        if(postData) {
            const post = postData.get({ plain: true });

            res.render("single-post", { post })
        } else {
            res.status(404).json
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/login", async (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/");
        return
    }
    res.render("login")
})

router.get("/signup", async (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/");
        return
    }
    res.render("signup")
})

module.exports = router;