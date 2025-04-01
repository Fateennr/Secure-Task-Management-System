const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: {
        type: String,
        enum: [ 'urgent', 'moderate', 'less important']
    },
    status: {
        type: String,
        enum: {
            values:['not started', 'in progress', 'completed'],
            message: "Cant assign custom statuses"
        }
    }
})

const taskModel = mongoose.model('tasks', TaskSchema);

module.exports = taskModel;
