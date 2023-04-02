import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import User from "./db/User.js"

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.port || 7000
connectDB()

const logger = (req, res, next) => {
    console.log(req.url)
    next()
}

app.use(logger)

app.post("/create", async (req, res) => {

    const name = req.body.name;
    const age = req.body.age

    if (!name || !age) {
        return res.status(400).json({
            msg: "Please provide name and age",
        });
    }

    try {
        const newUser = new User({
            name,
            age,
        });

        const user = await newUser.save();

        return res.status(201).json({
            msg: "User created successfully",
            user
        })

    } catch (eroor) {
        return res.status(500).json({
            msg: "Something went wrong",
        });
    }
});

app.get("/users", async (req,res) => {
    try {
        const users = await user.find();
        return res.status(200).json({
            msg: "Users fetched successfully",
            users,
        });
    }catch(error) {
        return res.status(500).json({
            msg: "Something went worng",
        });
    }
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});

const obj = {
    name: "John",
    age: 30,
}