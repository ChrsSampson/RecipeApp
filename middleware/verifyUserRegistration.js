// verify the information from the user before trying to create a new user

module.exports = function (req,res, next) {
    const { firstName, lastName, email, password } = req.body;

    // check if all the fields are filled out
    if (!firstName || !lastName || !email || !password) {
        req.flash('error', 'Please fill out all the fields');
        return res.redirect('/register');
    }
    // make sure the email is formated like an email
    else if (!email.includes('@') && !email.includes('.')) {
        req.flash('error', 'Please enter a valid email');
        return res.redirect('/register');
    }
    else {
        next()
    }
}