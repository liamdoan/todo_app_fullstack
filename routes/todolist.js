const router = require("express").Router()
const Todo = require("../models/Todo")
const {verifyToken} = require("./verifyToken")

// --------------------CREATE----------------------

router.post("/", verifyToken, async (req,res) => {
    const newTodo = new Todo(req.body)
    try{
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    }catch(err){
        res.status(500).json(err)
    }
});

// --------------UPDATE----------------
router.put("/:id", verifyToken, async (req,res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedTodo)
    } catch(err) {
        res.status(500).json(err)
    }
})

// ----------------DELETE-------------------

router.delete("/:id", verifyToken, async (req,res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json("Todo is deleted!")
    }catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router