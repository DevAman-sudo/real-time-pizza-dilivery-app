const User = require("../../models/user");

function authControllers() {

    return {
        login(req , res) {
            res.render('auth/login');
        },

        register(req , res) {
            res.render('auth/register');
        },

        postRegister(req , res) {

            const { name , email , password } = req.body;

            User.exists({ email: email }, (err , result) => {
                if (result) {
                    req.flash('error' , 'email already exists');
                    res.redirect('/register');
                }

            })

            // hashing password
            

            // create user
            const user = new User({
                name: name,
                email: email,
                password: password
            })

            res.send('success')

        }
    }

}

module.exports = authControllers;