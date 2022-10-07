const express = require("express");
const sequelize = require("./config/conenction");
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware:
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// Routes here



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT} 🚀`));
}); 