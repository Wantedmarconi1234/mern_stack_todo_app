const TodoModel = require('../database/db')
const mongoose = require('mongoose')

//get all todo tasks
const getTodos = async (req, res) => {
    try {
        const todo = await TodoModel.find({}).sort({createdAt: -1})
        res.status(200).json(todo)
    } catch (error) {
        res.status(404).json({Error: error.message})
    }
}


//get a single todo task
const getTodo = async (req, res) => {
    const {id} = req.params

    //if the Id is correct
    if (mongoose.Types.ObjectId.isValid(id)) {
        const todo = await TodoModel.findById(id)
        res.status(200).json(todo)
    }  

    //if ID is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({Error: "The Id is invalid"})
    }
}


//create a todo task
const createTodo = async (req, res) => {
    const todoRequest = req.body
    try {
        const todo = await TodoModel.create({...todoRequest})
        todo.save()
        res.status(200).json(todo)
    } catch (error) {
        res.status(404).json({Error: error.message})
    }

}

//delete a todo task
const deleteTodo = async (req, res) => {
    const {id} = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        const todo = await TodoModel.findByIdAndDelete({_id: id})
        res.status(200).json(todo)
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({Error: 'Ooops, there was an error, could not delete task'})
    }
}


//update a todo task
const updateTodo = async (req, res) => {

    const updateRequest = req.body
    const {id} = req.params

    //if ID is valid
    if (mongoose.Types.ObjectId.isValid(id)) {
        const todo = await TodoModel.findByIdAndUpdate({_id: id}, {...updateRequest})
        res.status(200).json(todo)
    }

    //if ID is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({Error: "Ooops, there was an error, could not update task"})
    }

}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}

