const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Task title is required
        minlength: 3,    // Minimum length for the title
        trim: true   
    },
    description: {
        type: String,
        maxlength: 500,   // Maximum length for description
        required: true, 
        trim: true
    },
    completed: {
        type: Boolean,
        default: false  // Default to subtask not being completed
    },
    dueDate: {
        type: Date,
        default: Date.now  // Default to current date if none is provided
      },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],  // Restrict priority to these values
        required: true, 
        default: 'Medium'                 // Default priority is Medium
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        required: true, 
        default: 'Pending'                // Default status is Pending
    },
    tags: [String],  // Array of strings to store tags
        completed: {
        type: Boolean,
        default: false  // Default to task not being completed
    },
    subtasks: [{
        title: {
          type: String,
        },
        completed: {
          type: Boolean,
          default: false  // Default to subtask not being completed
        }
    }],
},{timestamps: true})

module.exports = mongoose.model('todo', TodoSchema)