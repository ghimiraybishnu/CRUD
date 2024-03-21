import React, { useEffect, useState } from "react";
import InputForm from './InputForm';
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import UserEdit from "./UserEdit";
import './App.css';


const App = () => {
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);

//Fetch User on component mount
useEffect (() => {
  fetchUser();
}, []);

//Fetch users from API
const fetchUser = async () => {
  try {
    const response = await fetch ('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

//Create a new User
const addUser = async (userData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
});
const data = await response.json();
setUsers([...users, data]);
  } catch (error) {
    console.log("Error adding user", error);
  }
};

//Update an existing user
const updateUser = async (userData) => {
  setSelectedUser(userData)
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
    },
   body: JSON.stringify(userData),
    });
    const updatedUser = await response.json();
    const updatedUsers = users.map((user) => 
    user.id === updatedUser.id ? updatedUser : user );
    setUsers(updatedUsers);
    
  } catch (error) {
    console.error('error updating users:' , error);

  } finally{
    setSelectedUser(null);
  }
};

//Delete a user by id
const deleteUser = async (userId) => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE',
    });
    const updatedUsers = users.filter((user) => user.id !== userId);
    console.log("Updated Users after deleting: ", updatedUsers);
    setUsers(updatedUsers);
  } catch (error) {
    console.log('Error deleting User ', error);
  }
};
console.log(selectedUser)
  return (
   <div>
   <h1>CRUD Application!</h1>
   <InputForm addUser={addUser} updateUser={updateUser} initialData={{id: '', name: '', dob: '', address: ''}}/>
    <UserList users={users} viewUser={setSelectedUser} editUser={updateUser} deleteUser={deleteUser} />
    {selectedUser && (
      <div>
        <UserDetail user={selectedUser}/>
        <UserEdit user={selectedUser} updateUser={updateUser}/>
        
        </div>
    )}
    </div>
    
  );
};

export default App;
