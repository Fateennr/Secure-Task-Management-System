import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const loginForm = () =>{
    // const [FormData, setFormData] = useState({
    //     username: "",
    //     password: ""
    // })


    const navigate = useNavigate();


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;  
    //     console.log("name is "+ name);
    //     setFormData({
    //         ...FormData,
    //         [name]: value 
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const newuser = document.getElementById("username").value;
            const newpass = document.getElementById("password").value;

            console.log(newuser);
            console.log(newpass);

            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URI}/user/login`, {
                username: newuser,
                password: newpass
            },
            {
                withCredentials: true,
            });

            // localStorage.setItem("token", response.data.token);
            alert("Login Successful!");

            navigate(`/users/${response.data._id}`); // Corrected dynamic route
        }
        catch(err){
            console.error("login failed ", err.response.data);
        }
    };

    return (
        <>
            <h2> Login </h2>

            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
                <label htmlFor="username" >Name</label>
                <input id="username" type="text" name="username"/>
                            
                <label htmlFor="password" >Password</label>
                <input id="password" type="password" name="password"/>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default loginForm;