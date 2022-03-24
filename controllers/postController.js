const Post = require("../models/Posts");
const User = require("../models/User");

/* create a post */
async function createPost(req, res){
    const newPost = new Post(req.body);
 
    try {
       const savedPost = await newPost.save();
       res.status(200).json({
          success: true,
          message: "Successfully Created Post !",
          Post: savedPost
       });
    } catch (err) {
       res.status(500).json(err);
    }
};

/* Update a post */
async function updatePost( req, res ){
    try{
 
       const post = await Post.findById(req.params.id);
       // console.log('post : ', post);
       if(post.userID == req.body.userID){
          await post.updateOne({ $set : req.body })
          res.status(200).json({
             success : true,
             message : "The Post has been Updated Successfully ! "
          })
       }else{
          res.status(403).json({
             success : false,
             message : "You can Update only your Post"
          })
       }
    }catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};

/* Delete a post */
async function deletePost(req ,res){
   
    try{
       
       const post = await Post.findById(req.params.id);
       // console.log("post : ", post);
       if(post.userID === req.body.userID){
          // console.log("POST.UserID :", post.userID);
          // console.log("req.body.userID :", req.body.userID);
          await post.deleteOne();
          res.status(200).json({
             success : true,
             message : "The user has been Deleted, Successfully !"
          })
       }else{
          res.send(403).json({
             sucess : false,
             message : "You can Delete only your post !"
          })
       }
       
    }
    catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};
 
/* (like , Dislike ) a post */
async function like_Dislike_Post(req,res){
    try{
       const post = await Post.findById( req.params.id );
       if(!post.likes.includes(req.body.userID)){
          await post.updateOne({ $push : {likes : req.body.userID} })
          res.status(200).json({
             success : true,
             message : "The post has been liked !"
          })
       }
       else{
          await post.updateOne({
             $pull : { likes : req.body.userID}
          });
          res.status(500).json({
             success : true,
             message : "The post has been disliked !"
          });
       }
    }
    catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};

/* get a post */
async function getPost(req, res){
    try{
       const post =await Post.findById(req.params.id);
       res.status(200).json({
          success : true,
          message : "Successfully Fetched posts !",
          data : post
       })
    }catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};

/* get timeline post */
async function timelinePost(req, res){
   
    try{
 
       const currentUser = await User.findById( req.body.userID );
       const userPosts = await Post.find({ userID : currentUser._id })
       const friendPosts = await Promise.all(
          currentUser.followings.map((friendID)=> {
             return Post.find({ userID : friendID });
          })
       );
       res.status(200).json(...friendPosts);
    }
    catch(err){
       console.log(err);
       res.status(500).json(err);
    }
};
 
 


module.exports ={ createPost , updatePost , deletePost , like_Dislike_Post , getPost , timelinePost }