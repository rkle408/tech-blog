const router = require("express").Router();
// Import the Post table/model
const { Post } = require("../../models");
const { beforeDestroy } = require("../../models/User");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...body, userId: req.session.userId
        })
        res.status(200).json(newPost)
    }  catch(err) {
        res.status(500).json(err)
    }
})

// Update and delete based on an input id parameter:
router.put("/:id", withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if(affectedRows > 0) {
            res.status(200).json({ message: "Post has been updated"})
        } else {
            res.status(404).json({ message: "Post not found, cannot update"})
        }
    }  catch(err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
                where: {
                    id: req.params.id
                }
            }
        )
        if(affectedRows > 0) {
            res.status(200).json({ message: "Post has been deleted"})
        } else {
            res.status(404).json({ message: "No post exists to be deleted"})
        }
    }  catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;