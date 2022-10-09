const router = require("express").Router();
const authController = require("../controllers/authController");

/*
   *  user- "newHashed" || email : "newHashed@gmail.com" || password - "234"
    * user - "user2" , "user3" || password - "123"
    * user - "user11@gmail.com"  || password - "user11"
*/

/* Register User */
router.post("/register", authController.registerUser );

/* UserLogin */
router.post("/login" , authController.userLogin );



module.exports = router;