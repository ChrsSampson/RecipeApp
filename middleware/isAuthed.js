// make sure the user is logged in before allowing them to access the page

module.exports = function (req, res, next) {
    console.log(req.session)
    if (req.session.user) {
        next();
    }
    else {
        req.flash('error', 'Please log in to access that page');
        res.redirect('/login');
    }
}