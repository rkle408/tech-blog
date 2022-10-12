const express = require("express");
const sequelize = require("./config/conenction");
const sesion = require("express-sesion")
const app = express();
const path = require("path");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
    secret: "Secret key",
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}


const PORT = process.env.PORT || 3001;

// Middleware:
app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Routes here for now, will move to routes folder later
const { User } = require("./models");
const { Sequelize } = require("sequelize");
app.post("/api/user", async(req, res) => {
    try {
        const newUser= await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        })

    }
})

app.post("/api/user/login", async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user) {
            res.status(400).json({ message: "No user account found"})
            return
        }

        const validPassword = user.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "Not a valid password"})
            return
        }
    }
})

app.post("/api/user/logout", async(req, res) => {
    
})

// app. post("/api/post")

// app.post("/api/comment")
// End of routes

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} 🚀`));
}); 