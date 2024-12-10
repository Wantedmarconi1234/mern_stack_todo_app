const express = require('express')
const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require('../routes/Controller')
const {authProtected} = require('../routes/AuthMiddleware')

const router = express.Router()

// Protect all routes using middleware
// router.use(authProtected);

//get all todo tasks
router.get('/todo',authProtected, getTodos)


//get a single todo task
router.get('/todo/:id', getTodo)

//create a todo task
router.post('/todo', createTodo)

//delete a todo task
router.delete('/todo/:id', deleteTodo)

//edit a todo task
router.patch('/todo/:id', updateTodo)


module.exports = router