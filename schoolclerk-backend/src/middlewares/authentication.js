const passport = require('../helpers/passport.config');

function authenticateToken(req, res, next) {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = authenticateToken;
