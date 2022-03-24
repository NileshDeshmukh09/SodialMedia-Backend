const router = require("express").Router();
const { response } = require("express");
const Post = require("../models/Posts");
const User = require("../models/User");
const postController = require("../controllers/postController");

/* create a post */
router.post("/", postController.createPost );

/* Update a post */
router.put("/:id", postController.updatePost );

/* Delete a post */
router.delete("/:id", postController.deletePost );

/* (like , Dislike ) a post */
router.put("/:id/like", postController.like_Dislike_Post );

/* get a post */
router.get("/:id", postController.getPost );

/* get timeline post */
router.get("/timeline/all", postController.timelinePost);

module.exports = router;