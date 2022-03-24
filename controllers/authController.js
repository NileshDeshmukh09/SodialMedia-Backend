const User = require("../models/User");
const bcrypt = require("bcrypt");

/* Register User */
async function registerUser(req, res){

    try {

        /* Generate hashed Password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        /* Create new User */
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,

        });

        /* Save user and response */
        const user = await newUser.save();
        res.status(200).send({
            success : true,
            msg: "Successfully  Registered !",
            data : user
        });
    }
    catch (err) {
        res.status(500).json({
            success : "false",
            msg : "Invalid Details for Signup!"
        });
    }

};

/* UserLogin */
async function userLogin(req,res){

    try{

        /* userLogin */

        /* Email Check */
        const user = await User.findOne({ email : req.body.email });
        !user && res.status(404).json({
            status: false,
            msg : " User Not Found"
        });

        /* ValidPassword */
        const validPassword = await bcrypt.compare( req.body.password , user.password);
        !validPassword  && res.status(400).json({ 
            status : false,
            msg : "Ohh ! Wrong Pssword",
         });

        res.status(200).json( user );
    }
    catch(err){
        res.status(500).json({
            success : "false",
            msg : "Invalid Details for Login"
        });
        
    }

};

module.exports = { registerUser , userLogin }