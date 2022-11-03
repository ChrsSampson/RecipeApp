// extract the user info form the secure session and make it available to the view

module.exports = (req,res,next) => {
    res.locals.user ={
        email: req.session.user.email,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        id: req.session.user._id,
        color: req.session.user.color,
        family: req.session.user.family,
        joined: req.session.user.joined
    }
    next();
}