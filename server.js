const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session")
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

// Database will be able to store sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Want to make cookie for session
const sess = {
    secret: "Secret key",
    cookie: {
        // miliseconds
        maxAge: 300000,
        // What can cookie handle?
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        // Store in sequelize
        db: sequelize
    })
}

// Middleware:
app.use(session(sess));
// Need some HTML:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Routes here for now, will move to routes folder later

// Extract User model to create a new user:
const { User } = require("./models");
const { Sequelize } = require("sequelize");
app.post("/api/user", async (req, res) => {
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
app.post("/api/user/login", async (req, res) => {
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

app.post("/api/user/logout", async(req, res) => {
    
})

// app. post("/api/post")

// app.post("/api/comment")
// End of routes

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} 🚀`));
}); 