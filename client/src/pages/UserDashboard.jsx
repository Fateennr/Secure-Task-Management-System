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
  const [error, setError] = useState('');

  // Fetch all tasks for the user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URI}/tasks/`, {
          withCredentials: true,
        });

        console.log("data is ", response.data.data);
        setTasks(response.data.data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err.response?.data?.message || err.message);
        setError('Failed to load tasks.');
      }
    };
    fetchTasks();
  }, []);

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

  // Open edit form with task data
  const openEditForm = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      due_date: task.due_date.split('T')[0], // Format for input
    });
    setShowEditForm(true);
  };

  // Task form component
  const TaskForm = ({ isEdit = false, onSubmit }) => (
    <div style={styles.formOverlay}>
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>{isEdit ? 'Edit Task' : 'Add New Task'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={onSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="urgent">Urgent</option>
              <option value="moderate">Moderate</option>
              <option value="less important">Less Important</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitButton}>
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
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f4f7fa',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '2rem',
      color: '#333',
    },
    addButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      transition: 'background-color 0.3s',
    },
    addButtonHover: {
      backgroundColor: '#218838',
    },
    taskGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    taskCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    },
    taskCardHover: {
      transform: 'translateY(-5px)',
    },
    taskTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    taskDetail: {
      fontSize: '0.9rem',
      color: '#666',
      margin: '5px 0',
    },
    priority: {
      padding: '5px 10px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      display: 'inline-block',
    },
    priorityUrgent: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
    priorityModerate: {
      backgroundColor: '#fff3cd',
      color: '#856404',
    },
    priorityLess: {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    status: {
      padding: '5px 10px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      display: 'inline-block',
    },
    statusNotStarted: {
      backgroundColor: '#e2e3e5',
      color: '#383d41',
    },
    statusInProgress: {
      backgroundColor: '#cce5ff',
      color: '#004085',
    },
    statusCompleted: {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    taskActions: {
      marginTop: '10px',
      display: 'flex',
      gap: '10px',
    },
    editButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    formOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    formTitle: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      color: '#333',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '0.9rem',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '0.9rem',
      minHeight: '100px',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '0.9rem',
    },
    formActions: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    error: {
      color: '#dc3545',
      fontSize: '0.9rem',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Your Tasks</h1>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          style={styles.addButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor)}
        >
          +
        </button>
      </div>
      {tasks.length === 0 ? (
        <p style={styles.taskDetail}>No tasks found. Add a new task to get started!</p>
      ) : (
        <div style={styles.taskGrid}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={styles.taskCard}
              onMouseOver={(e) => (e.currentTarget.style.transform = styles.taskCardHover.transform)}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <h3 style={styles.taskTitle}>{task.title}</h3>
              <p style={styles.taskDetail}>{task.description || 'No description'}</p>
              <p style={styles.taskDetail}>
                Priority:{' '}
                <span
                  style={{
                    ...styles.priority,
                    ...(task.priority === 'urgent'
                      ? styles.priorityUrgent
                      : task.priority === 'moderate'
                      ? styles.priorityModerate
                      : styles.priorityLess),
                  }}
                >
                  {task.priority}
                </span>
              </p>
              <p style={styles.taskDetail}>
                Status:{' '}
                <span
                  style={{
                    ...styles.status,
                    ...(task.status === 'not started'
                      ? styles.statusNotStarted
                      : task.status === 'in progress'
                      ? styles.statusInProgress
                      : styles.statusCompleted),
                  }}
                >
                  {task.status}
                </span>
              </p>
              <p style={styles.taskDetail}>
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
              <div style={styles.taskActions}>
                <button
                  onClick={() => openEditForm(task)}
                  style={styles.editButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  style={styles.deleteButton}
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