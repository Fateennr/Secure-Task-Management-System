import { useState, useEffect } from "react";
import axios from 'axios';


const UsersList = () => {
    const[allUsers, setAllUsers ] = useState([]);
    const [isEditOpen, setisEditOpen ] = useState(false);
    const [isAddOpen, setisAddOpen ] = useState(false);

    const [user, SetUser] = useState({
        _id:"",
        username: "",
        email: "",
        password: ""
    },[]);

    const[FormData, setFormData] = useState({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password
    });

    const FetchUsers = async () =>{
        try{
            const response = await axios.get("http://localhost:3000/get-users",{
                withCredentials: true
            });

            console.log(response.data);
            setAllUsers(response.data);
        }
        catch(err){
            console.error('Error while fetching data: ', err);
        }
    }

    const DeleteUser = async (id) =>{
        try{
            const response = await axios.delete(`http://localhost:3000/delete-user/${id}`);

            console.log(response.data);
        }
        catch(err){
            console.error('Error while fetching data: ', err.data);
        }
    }

    const handleDeleteClick = async (id) => {
        await DeleteUser(id);
        await FetchUsers();
    }

    const UpdateUser = async (user_id, UpdatedData) =>{
        try{
            const response = await axios.put(`http://localhost:3000/update-user/${user_id}`, UpdatedData);
            console.log("updated data is "+UpdatedData.data);

            console.log("Succeessfull updated user data");
        }
        catch(err){
            console.error("Error updating the data from frontend");
        }
    }


    const AddUser = async (Data) =>{
        try{
            const response = await axios.post(`http://localhost:3000/register/`,Data,{
                withCredentials: true
            });
            console.log("added data is "+Data.data);

            console.log("Succeessfully added user data");
        }
        catch(err){
            console.error("Error adding the data from frontend");
        }
    }

    const HandleEditClick = (user) => {
        setisEditOpen(true);
        SetUser(user);
        setFormData(user);
    }

    useEffect(()=>{
        // HandleEditButton();
        FetchUsers();
    },[]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;  
        console.log("name is "+ name);
        setFormData({
            ...FormData,
            [name]: value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault() ; // to stop the page from relaoding
        await UpdateUser(FormData._id, FormData);

        console.log("The function is invoked");
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault() ; // to stop the page from relaoding
        await AddUser(FormData);
        await FetchUsers();

        console.log("The function is invoked");
    };


    return(
        <>  
            <h2> Users </h2>
            
            <button onClick={() => {
                setisAddOpen(true);
            }}>Add users</button>

            {
                isAddOpen && (
                    <>

                        {/* // increact the stylings should be in json format */}

                        <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleAddSubmit}>
                            <label htmlFor="username" >Name</label>
                            <input id="username" type="text" name="username" defaultValue={user.username} onChange={handleInputChange}/>
                            <label htmlFor="email" >Email</label>
                            <input id="email" type="text" name="email" defaultValue={user.email} onChange={handleInputChange}/>
                            <label htmlFor="password" >Password</label>
                            <input id="password" type="password" name="password" defaultValue={user.password} onChange={handleInputChange}/>

                            <button type="submit">Submit</button>
                        </form>

                    </>
                )
            }

            <table>
                <thead>
                    <tr>
                        <th className="rainbow"> username </th>
                        <th className="rainbow"> email </th>
                        <th className="rainbow"> edit </th>
                        <th className="rainbow"> delete </th>
                    </tr>
                </thead>
                <tbody>
                { allUsers.map((users, index)=>{
                    return (
                        <tr key={index} >
                            <td className="rainbow"> { users.username } </td>
                            <td className="rainbow"> { users.email } </td>
                            <td className="rainbow"> <button onClick={() => 
                                {
                                    HandleEditClick(users);
                                }}> 
                                    Edit 
                                </button> 
                            </td>
                            <td className="rainbow"> 
                                <button onClick={()=> {
                                    handleDeleteClick(users._id);
                                }}> Delete 
                                </button> 
                            </td>
                        </tr>
                    );
                }) }
                </tbody>
            </table>
            
            {
                isEditOpen && (
                    <>
                        <div> 
                            <p> Edited User </p>
                            <p> {user.username } </p>
                            <p> {user.email} </p>
                        </div>

                        {/* // increact the stylings should be in json format */}

                        <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
                            <label htmlFor="username" >Name</label>
                            <input id="username" type="text" name="username" defaultValue={user.username} onChange={handleInputChange}/>
                            <label htmlFor="email" >Email</label>
                            <input id="email" type="text" name="email" defaultValue={user.email} onChange={handleInputChange}/>
                            <label htmlFor="password" >Password</label>
                            <input id="password" type="password" name="password" defaultValue={user.password} onChange={handleInputChange}/>

                            <button type="submit">Submit</button>
                        </form>

                    </>
                )
            }    
        </>
    );

}

export default UsersList;
