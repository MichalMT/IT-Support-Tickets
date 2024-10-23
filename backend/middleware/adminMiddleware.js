function checkAdmin(req, res, next) {
    // Ensure the user is authenticated and the role exists in the token
    if (req.user && req.user.isAdmin === true) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}
module.exports = { checkAdmin };