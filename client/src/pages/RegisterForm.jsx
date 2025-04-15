import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = { username, email, password };
      console.log(formData);
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URI}/user/register`, formData);
        if (response) {
          console.log('User registered:', response.data);
  
          navigate(`/login`); // Corrected dynamic route
        } else {
          console.error('Error registering user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit} className='forms' >
          <label htmlFor="username">Name</label>
          <input id="username" type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
  
          <label htmlFor="email" >Email</label>
          <input id="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
  
          <label htmlFor="password" style={{"margin-top": "15px"}}>Password</label>
          <input id="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
  
          <button type="submit" style={{"margin-top": "15px"}}>Submit</button>
        </form>
        </>
    );
}

export default RegisterForm;