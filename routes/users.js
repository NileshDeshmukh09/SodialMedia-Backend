const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController");

/* getUser */
router.get("/:id", userController.getUser);

/* update User */
router.put("/:id", userController.updateUser);
  
/* Delete User */
router.delete("/:id", userController.deleteUser);

/* followUser */
router.put("/:id/follow",userController.followUser);

/* Unfollow User */
router.put("/:id/unfollow" ,userController.unfollowUser);

module.exports = router;