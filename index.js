const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const connectDB = require("./db/connect");

dotenv.config();

/* MiddleWare */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening at http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}

console.log(start());