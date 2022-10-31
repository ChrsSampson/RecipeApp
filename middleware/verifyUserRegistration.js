// verify the information from the user before trying to create a new user

module.exports = function (req,res, next) {
    const { firstName, lastName, email, password } = req.body;

    // check if all the fields are filled out
    if (!firstName || !lastName || !email || !password) {
        console.error('All fields are required');
        return res.redirect('/register');
    }
    // make sure the email is formated like an email
    if (!email.includes('@') && !email.includes('.')) {
        console.error('Invalid email');
        return res.redirect('/register');
    }

    next()
}