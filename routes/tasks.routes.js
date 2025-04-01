const router = require('express').Router();
const TaskServices =  require('../services/tasks.services');


router.get('/', TaskServices.getAllTasks);
router.post('/new-task', TaskServices.addTasks);
router.put('/edit-task/:id', TaskServices.editTask);
router.delete('/remove-task/:id', TaskServices.DeleteTask);

module.exports = router;