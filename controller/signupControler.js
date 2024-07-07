// ;const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require("../public/profile");
// const userModel = require("../model/user");
const { secret } = require("../constant");
// const secret = 'naveedrashid';

const bcrypt = require('bcrypt');

module.exports = {
    GetSignupPage: async function(req, res, next) {
        try {
            res.render('signupPage');
        } catch (err) {
            next(err);
        }
    },
    close: async function(req, res, next) {
        try {
            res.render('index');
        } catch (err) {
            next(err);
        }
    },
    MainLayout: async function(req, res, next) {
        try {
            let user = await userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.send("Email or Password are incorrect");
            }
    
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return next(err);
                }
                if (result) {
                    let token = jwt.sign({ email: user.email }, secret); // No expiry time set
                    res.cookie("token", token, { httpOnly: true }); // Secure the cookie
                    res.cookie("firstName", user.firstName, { httpOnly: true });
                    res.cookie("lastName", user.lastName, { httpOnly: true });
                    res.cookie("email", user.email, { httpOnly: true });
                    return res.render('MainLayout', { user });
                } else {
                    return res.send("Email or Password are incorrect");
                }
            });
        } catch (err) {
            next(err);
        }
    },
    
    login: async function (req, res, next) {
        try {
            let { fname, lname, email, password, dob, gender } = req.body;
            let dateOfBirth = new Date(dob);
    
            // Format dateOfBirth to YYYY-MM-DD
            dateOfBirth = dateOfBirth.toISOString().split('T')[0];
    
            // Check if email already exists
            let existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send("Email is already registered.");
            }
    
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let createdUser = await userModel.create({
                firstName: fname,
                lastName: lname,
                email,
                password: hash,
                dateOfBirth, // Save formatted dateOfBirth
                gender
            });
    
            let token = jwt.sign({ email }, secret);
            res.cookie("token", token);
            res.render('index', { user: createdUser });
        } catch (err) {
            next(err);
        }
    },
    
    profile: async function(req, res, next) {
        try {
            const user = req.user; // User data extracted from middleware
            res.render('profile', { firstName: user.firstName, lastName: user.lastName, email: user.email });
        } catch (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    
    // logout
    logout: async function(req,res,next){
        try {
            res.clearCookie('token'); // Clear the token cookie
    res.clearCookie('firstName');
    res.clearCookie('lastName');
    res.clearCookie('email');
            res.render('index');
            
        } catch (err) {
            next(err);
        }
    },
};
    

