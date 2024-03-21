import React from 'react'
import './UserDetail.css';

const UserDetail =  ({ user }) => {
  return (
    <div>
      <h2>User Detail</h2>
      <p>Name: {user?.name}</p>
      <p>Date of Birth: {user?.phone}</p>
      <p>Address: {user?.address?.city}</p>
    </div>
  );
};

export default UserDetail;
