const logout = (req, res, next) => {
    req.session.destroy(function(err) {
        let msg;

        if(err) {
            msg = 'Error destroying session';
            res.json(msg);
        } else {
            msg = 'Session destroy successfully';
            res.json(msg);
        }
    });
};

module.exports = {
  logout
};