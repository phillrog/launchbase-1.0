const onlyUsers = (req, res, next) => {
    if (!req.session.userId )
        return res.redirect('/users/login');

    
    next();
}

const isLoggedRedirectToUsers = (req, res, next) => {
    if (req.session.userId)
        return res.redirect('/users');

    next();
}

module.exports = { onlyUsers, isLoggedRedirectToUsers }