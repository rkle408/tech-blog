const router = require("express").Router();
// Import the Post table/model
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {

})

// Update and delete based on an input id parameter:
router.put("/:id", withAuth, async (req, res) => {
    
})

router.delete("/:id", withAuth, async (req, res) => {
    
})

module.exports = router;