module.exports = isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('Authenticated');
        return next();
    }
    res.send('You are not authenticated!');
};