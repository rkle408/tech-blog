const express = require("express")
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware:
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// Routes here



app.listen(PORT, () => {
    console.log(`Event listening at: http://localhost:${PORT} 🚀`)
})