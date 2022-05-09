const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema(
    {
        // userID: {
        //     type: String,
        //     required: true,
        //     unique: true,
        // },
        todoname: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: false
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Todo", TodoSchema)