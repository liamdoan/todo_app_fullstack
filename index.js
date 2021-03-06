const express = require("express")

const app = express();

const mongoose = require("mongoose")

const dotenv = require("dotenv")


const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const todoRoute = require("./routes/todolist")

dotenv.config()


mongoose
    .connect(
        process.env.MONGO_URL)
    .then(() => 
        console.log("database connected successfully"))
    .catch((err) => {
        console.log(err)
})

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/todo", todoRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log("backend connected")
})