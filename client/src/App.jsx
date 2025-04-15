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
      <nav>
        <ul style={{ "background-color" : "red", "display" : "flex" }}>
          <li style={{"listStyle":"none", "margin-left": "5px"}}><Link to="/">Home</Link></li>
          <li style={{"listStyle":"none", "margin-left": "5px"}}><Link to="/register">Register Now</Link></li>
        </ul>
      </nav>

      Dashboard

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
