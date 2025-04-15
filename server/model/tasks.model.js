const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: {
        type: String,
        enum:{
            values: [ 'urgent', 'moderate', 'less important'],
            message: "Invalid priority assignment"
        } 
    },
    status: {
        type: String,
        enum: {
            values:['not started', 'in progress', 'completed'],
            message: "Cant assign custom statuses"
        }
    },
    due_date: {
        type: Date,
        require: [true, 'Due date is required']
    }
})

const taskModel = mongoose.model('tasks', TaskSchema);

module.exports = taskModel;
