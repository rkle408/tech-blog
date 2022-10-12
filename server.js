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


// app. post("/api/post")

// app.post("/api/comment")
// End of routes

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} 🚀`));
}); 