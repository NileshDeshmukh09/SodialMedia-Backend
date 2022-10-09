const User = require("../models/User");
const bcrypt = require("bcrypt");

/* update User */
 async function updateUser(req, res){

    if (req.body.userID === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({
                success: true,
                msg: "Account has been updated !",
            })
        }
        catch (err) {
            return res.status(500).json(err);

        }
    }
    else {
        return res.status(403).json({
            msg: "You can update Only your Account !"
        })
    }
};

/* Delete User */
async function deleteUser(req, res){

    if (req.body.userID === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                msg: "Account has been Deleted !",
            })
        }
        catch (err) {
            return res.status(500).json(err);

        }
    }
    else {
        return res.status(403).json({
            msg: "You can Delete Only your Account !"
        })
    }
};

/* getUser */
async function getUser(req, res){
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json({
            success: true,
            msg: "successfully Fetched Request !",
            userDetails: other
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

/* followUser */
async function followUser(req, res){
    if ( req.body.userID !== req.params.id ) {
        try {
            const user = await User.findById( req.params.id );
            const currentUser = await User.findById( req.body.userID );
            if ( !user.followers.includes(req.body.userID )) {
                await user.updateOne({ $push: { followers: req.body.userID } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json(" Hurray !, User has been Followed !");
            }
            else {
                res.status(403).json({
                    success: false,
                    msg: "You already follow this user !",
                })
            }

        } catch (err) {
                res.status(500).json({ Error : err  })

        }

    }
    else {
        res.status(403).json("You Cannot follow yourself !")
    }
};

/* Unfollow User */
async function unfollowUser(req, res){
    if(req.body.userID !== req.params.id){

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userID);
            
            if(user.followers.includes(req.body.userID)){
                await user.updateOne({ $pull : { followers : req.body.userID}});
                await currentUser.updateOne({ $pull : { followings : req.params.id}});

                res.status(200).json({
                    status : 200,
                    message : "User has been Unfollowed !"
                });
            }
            else{
                res.status(403).json("You dont follow this user !")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You cannot unfollow yourself !");
    }
};



module.exports ={ updateUser , deleteUser , getUser , followUser , unfollowUser } 