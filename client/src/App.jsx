import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import Users from './pages/users';
// import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <Router>
      <RegisterForm/>
    </Router>
  );
}

// function MainApp() {
  

//   return (
//     <>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/register">Register Now</Link></li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//       </Routes>
//     </>
//   );
// }

// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//     <p>Welcome to the home page!</p>
//   </div>
// );

export default App;
