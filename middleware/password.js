function checkPassword(req, res, next) {
    let { password } = req.body;
    if (!password || password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long');
    }
    next();
}

module.exports = checkPassword;
