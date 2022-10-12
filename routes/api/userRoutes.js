// Extract User model to create a new user:
const router = require("express").Router();
// Need to get to the correct model folder:
const { User } = require("../../models");
const { Sequelize } = require("sequelize");
router.post("/user", async (req, res) => {
    try {
        const newUser= await User.create({
            username: req.body.username,
            // Don't need to do encryption here, we already set it in the model
            password: req.body.password
        });
        // Set up a session to save user data:
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        })

    } catch(err) {
        res.status(500).json(err)
    }
})

// Validate a user logging in:
router.post("/user/login", async (req, res) => {
    try {
        // Find a matching username
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user) {
            res.status(400).json({ message: "Could not find user account!"})
            // Then stop this part:
            return
        }

        // If the user is found, then we need to validate the password:
        const validPassword = user.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "This password does not match our records, please try again."})
            return
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true

            res.status(200).json({ user, message: "You are logged in!"})
        })

    } catch(err) {
        res.status(400).json({ message: "No user or matching password found. Please try again." })
    }
})

router.post("/user/logout", async (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router;