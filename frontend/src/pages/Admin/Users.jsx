import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import ADminMenu from '../../components/layout/ADminMenu';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/allusers');
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { data } = await axios.put('http://localhost:8000/api/update-role', { userId, role: newRole });
      setUsers(users.map(user => user._id === userId ? data.user : user));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <ADminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-5"><u>All Registered Users</u></h2>
            <div className="row">
              {users.map(user => (
                <div key={user._id} className="col-md-4 mb-4">
                  <div className="card user-card">
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                      <p className="card-text"><b>Email:</b> {user.email}</p>
                      <p className="card-text"><b>Phone:</b> {user.phone}</p>
                      <p className="card-text"><b>Address:</b> {user.address}</p>
                      <p className="card-text"><b>Role:</b> {user.role === 1 ? 'Admin' : 'User'}</p>
                      <div className="form-group mt-2">
                        <label htmlFor="roleSelect">Change Role</label>
                        <select
                          id="roleSelect"
                          className="form-control mt-2"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        >
                          <option value={0}>User</option>
                          <option value={1}>Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
