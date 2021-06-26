import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercises(props) {
    const [exerciseslist, setExercisesList] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []  
    })

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+props.match.params.id)
        .then(response => {
            setExercisesList((prev) => {
                return {
                    ...prev,
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                }
            })   
        })
        .catch(function (error) {
          console.log(error);
        })
        axios.get('http://localhost:5000/users/')
            .then(response => {
            if (response.data.length > 0) {
                setExercisesList((prev) => {
                    return {
                        ...prev,
                        users: response.data.map(user => user.username)
                    }
                })
            }
            })
    }, [props.match.params.id   ])

    function onChangeUsername(e) {
        setExercisesList((prev) => {
            return {
                ...prev,
                username: e.target.value
            }
        });
    }
    
    function onChangeDescription(e) {
        setExercisesList((prev) => {
            return {
                ...prev,
                description: e.target.value
            }
        });
    }

    function onChangeDuration(e) {
        setExercisesList((prev) => {
            return {
                ...prev,
                duration: e.target.value
            }
        });
    }

    function onChangeDate(date) {
        setExercisesList((prev) => {
            return {
                ...prev,
                date: date
            }
        });
    }

    function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: exerciseslist.username,
            description: exerciseslist.description,
            duration: exerciseslist.duration,
            date: exerciseslist.date
        }

        console.log(exercise)

        axios.put('http://localhost:5000/exercises/update/'+props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    return (
        <div>
          <h3>Edit Exercise Log</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select // ref="userInput"
                  required
                  className="form-control"
                  value={exerciseslist.username}
                  onChange={onChangeUsername}>
                  {
                    exerciseslist.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={exerciseslist.description}
                  onChange={onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={exerciseslist.duration}
                  onChange={onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div> 
                <DatePicker
                  selected={exerciseslist.date}
                  onChange={onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )

}

export default EditExercises