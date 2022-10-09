const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const startRouter = require("./routes/start");
const connectDB = require("./db/connect");

dotenv.config();

/* MiddleWare */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use( startRouter);


const start = async () => {
    try {
        
        await connectDB(process.env.MONGO_URL);
      
        console.log("MongoDB Connected !");
        app.listen(process.env.PORT, console.log(`Server is listening at http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

console.log(start());