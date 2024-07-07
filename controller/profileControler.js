const userModel = require("../public/user")
const bcrypt = require('bcrypt');
module.exports = {
    login: async function(req,res,next){
        res.render('index');
    },
    loginProfile: async function (req, res, next) {
        try {
            let {email, password} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let createdUser = await userModel.create({
              email,
                password: hash,
             
            });
            // Pass user data to dp.ejs
            return res.render('working', { user: createdUser });
        } catch (err) {
            next(err);
        }
    },
    working : async function(req,res,next){
       try{
        res.render('working');
       } catch (err) {
        next(err);
    }
    },
    GetSignupPage: async function(req,res,next){
        try{
         res.render('signupPage');
        } catch (err) {
         next(err);
     }
     },
    


}
