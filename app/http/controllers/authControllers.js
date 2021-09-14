const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../../models/user");

function authControllers() {

    return {
        login(req , res) {
            res.render('auth/login');
        },

        postLogin(req , res , next) {
            passport.authenticate('local' , (err , user , info) => {

                if (err) {
                    req.flash("error" , info.message);
                    return next(err);
                }

                if (!user) {
                    req.flash("error" , info.message);
                    return res.redirect("/login");
                }

                req.logIn( user , (err) => {
                    if(err) {
                        req.flash("error" , info.message);
                        return next(err);
                    }

                    return res.redirect('/');
                });

            })(req , res , next);
        },

        register(req , res) {
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

        },

        logout(req , res) {
            req.logout();
            return res.redirect('/login');
        }
    }

}

module.exports = authControllers;