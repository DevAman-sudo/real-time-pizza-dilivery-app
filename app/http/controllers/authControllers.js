const bcrypt = require("bcrypt");
const User = require("../../models/user");

function authControllers() {

    return {
        login(_req , res) {
            res.render('auth/login');
        },

        register(_req , res) {
            res.render('auth/register');
        },

        async postRegister(req , res) {

            const { username , email , password } = req.body;

            User.exists({ email: email }, (err , result) => {
                if (result) {
                    req.flash('error' , 'email already exists');
                    res.redirect('/register');
                }

            })

            // hashing password
            const hashedPassword = await bcrypt.hash(password , 10);

            // create user
            const user = new User({
                username,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {
                res.redirect('/');
            }).catch((error) => {
                req.flash('error' , 'Something went wrong');
                console.log(error)
                res.redirect('/register');
            })

        }
    }

}

module.exports = authControllers;