import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDashboard = () => {
  const { id } = useParams(); // Get user ID from URL
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'less important',
    status: 'not started',
    due_date: '',
  });
  const [searchFilters, setSearchFilters] = useState({
    priority: '',
    due_date: '',
    sort_by: '',
  });
  
  const [error, setError] = useState('');

  // Fetch all tasks for the user
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks(filters = {}){
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `${import.meta.env.VITE_API_BACKEND_URI}/tasks/?${query}`,
        { withCredentials: true }
      );
      setTasks(response.data.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err.response?.data?.message || err.message);
      setError('Failed to load tasks.');
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
    handleSearch();
  };
  
  const handleSearch = () => {
    fetchTasks(searchFilters);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'less important',
      status: 'not started',
      due_date: '',
    });
    setError('');
  };

  // Handle add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URI}/tasks/new-task`,
        { ...formData, userId: id },
        { withCredentials: true }
      );
      setTasks([...tasks, response.data]);
      setShowAddForm(false);
      resetForm();
    } catch (err) {
      console.error('Failed to add task:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to add task.');
    }
  };

  // Handle edit task
  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BACKEND_URI}/tasks/edit-task/${currentTask._id}`,
        formData,
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === currentTask._id ? response.data : task)));
      setShowEditForm(false);
      setCurrentTask(null);
      resetForm();
      fetchTasks();
    } catch (err) {
      console.error('Failed to edit task:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to edit task.');
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BACKEND_URI}/tasks/remove-task/${taskId}`, {
          withCredentials: true,
        });
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (err) {
        console.error('Failed to delete task:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Failed to delete task.');
      }
    }
  };

  const openEditForm = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      due_date: task.due_date.split('T')[0],
    });
    setShowEditForm(true);
  };

  // Task form component
  const TaskForm = ({ isEdit = false, onSubmit }) => (
    <div className="formOverlay">
      <div className="formContainer">
        <h2 className="formTitle">{isEdit ? 'Edit Task' : 'Add New Task'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="formGroup">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea"
            />
          </div>
          <div className="formGroup">
            <label className="label">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="select"
            >
              <option value="urgent">Urgent</option>
              <option value="moderate">Moderate</option>
              <option value="less important">Less Important</option>
            </select>
          </div>
          <div className="formGroup">
            <label className="label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="select"
            >
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="formGroup">
            <label className="label">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="formActions">
            <button type="submit" className="submitButton">
              {isEdit ? 'Update Task' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setShowEditForm(false);
                setCurrentTask(null);
                resetForm();
              }}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );


  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Your Tasks</h1>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="addButton"
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor ="blue")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor ="red")}
        >
          +
        </button>
      </div>
      
      <div className="formGroup" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select name="priority" className="select" value={searchFilters.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="moderate">Moderate</option>
          <option value="less important">Less Important</option>
        </select>

        <input
          type="date"
          name="due_date"
          className="input"
          value={searchFilters.due_date}
          onChange={handleFilterChange}
        />

        <select name="sortby" className="select" value={searchFilters.sort_by} onChange={handleFilterChange}>
          <option value="1">Ascending</option>
          <option value="-1">Descending</option>
        </select>

        <button onClick={handleSearch} className="btn-submit" style={{ padding: '8px 16px' }}>
          Search
        </button>
      </div>


      {tasks.length === 0 ? (
        <p className="taskDetail">No tasks found. Add a new task to get started!</p>
      ) : (

        <div className="taskGrid">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="taskCard"
              onMouseOver={(e) => (e.currentTarget.style.transform = "purple")}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <h3 className="taskTitle">{task.title}</h3>
              <p className="taskDetail">{task.description || 'No description'}</p>
              <p className="taskDetail">
                Priority:{' '}
                <span
                  // style={{
                  //   "priority":
                  //     (task.priority === 'urgent'
                  //     ?"priorityUrgent"
                  //     : task.priority === 'moderate'
                  //     ?"priorityModerate"
                  //     :"priorityLess"),
                  // }}
                >
                  {task.priority}
                </span>
              </p>
              <p className="taskDetail">
                Status:{' '}
                <span
                  // style={{
                  //   .."status,
                  //   ...(task.status === 'not started'
                  //     ?"statusNotStarted
                  //     : task.status === 'in progress'
                  //     ?"statusInProgress
                  //     :"statusCompleted),
                  // }}
                >
                  {task.status}
                </span>
              </p>
              <p className="taskDetail">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
              <div className="taskActions">
                <button
                  onClick={() => openEditForm(task)}
                  className="editButton"
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="deleteButton"
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddForm && <TaskForm onSubmit={handleAddTask} />}
      {showEditForm && <TaskForm isEdit={true} onSubmit={handleEditTask} />}
    </div>
  );
};

export default UserDashboard;