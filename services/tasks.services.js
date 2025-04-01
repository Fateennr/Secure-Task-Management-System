const taskModel = require('../model/tasks.model');

class TaskServices {
    async addTasks(req, res){
        try{
            const task = req.body;
            const insertedTask = await taskModel.insertOne(task);

            return res.status(201).json({
                success:false,
                data: insertedTask
            })

        }catch (error){
            return res.status(500).json({
                success:false,
                message: error.message
            })
        }
    }

    async getAllTasks(req, res) { 
        try{
            const tasks = await taskModel.find();
            console.log(" get request hit");
            return res.status(201).json({
                success: true, data: tasks
            });
        }
        catch(err) {

            return res.status(500).json({
                success:false,
                message: err.message
            })
        }
    }

    async editTask(req, res){
        console.log('hellwo?');
        try{
            // console.log("id is " + id);
            const { id }  = req.params;
            const updatedTask = await taskModel.findByIdAndUpdate( 
                id,
                { $set: req.body },
                { new: true, runValidators: true, context: 'query' } // otherwise the update function will take input outside enums
             );
            return res.status(200).json({
                success:true,
                data: updatedTask
            });
        }
        catch(err){
            return res.status(500).json({
                success:false, message: err.message
            })
        }
    }

    async DeleteTask(req, res) {
        try{
            const { id } = req.params;
            const deletedTask = await taskModel.findByIdAndDelete(id);
            return res.status(201).json({
                sucess: true,
                message: "Task successfully deleted"
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}


module.exports = new TaskServices(); 