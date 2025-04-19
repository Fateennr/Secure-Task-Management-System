import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import Users from './pages/users';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import ProtectedRoute from './pages/ProtectedRoute';
import UserDashboard from './pages/UserDashboard';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <MainApp/>
    </Router>
    </>
  );
}

function MainApp() {
  

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h3 className="logoText">Task Manager</h3>
        </div>
        <ul className="navList">
          <li className="navItem"><Link className="navLink" to="/">Home</Link></li>
          <li className="navItem"><Link className="navLink" to="/register">Register</Link></li>
          <li className="navItem"><Link className="navLink" to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:id" element={<UserDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;


