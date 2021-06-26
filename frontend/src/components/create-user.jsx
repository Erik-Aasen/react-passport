import React, { useState } from 'react';
import axios from 'axios';

function CreateUsers(props) {
        const [user, setUser] = useState({
            username: '',
            password: '',
        })

        function onChangeUser(e) {
            setUser((prev) => {
                return {
                    ...prev,
                    username: e.target.value
                }
            });
        }

        function onChangePassword(e) {
            setUser((prev) => {
                return {
                    ...prev,
                    password: e.target.value
                }
            });
        }
    
        function onSubmit(e) {
            e.preventDefault();
    
            const userObject = {
                username: user.username,
                password: user.password 
            }
    
            // console.log(user)
    
            axios.post('http://localhost:5000/users/add', userObject)
                .then(res => console.log(res.data));
    
            setUser({ 
                username: '',
                password: ''
            })
        }
    
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={user.username}
                        onChange={onChangeUser}
                        />
                    <label>Password: </label>
                    <input  type="password"
                        required
                        className="form-control"
                        value={user.password}
                        onChange={onChangePassword}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
            )
        } 

export default CreateUsers