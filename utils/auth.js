// Function to check the session

const withAuth = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect("/login")
    } else {
        // Continue to log in
        next();
    }
}

module.exports = withAuth;