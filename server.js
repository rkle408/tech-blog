const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session")
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

const helpers = require("./utils/helpers");


// Connects this to the routes folder:
const routes = require("./routes");

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
const hbs = exphbs.create({ helpers });
app.use("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Need some HTML:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} 🚀`));
}); 