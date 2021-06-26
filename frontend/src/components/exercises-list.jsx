import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise(props) {
    return(
    <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
    <Link to={"/edit/"+props.exercise._id}>edit</Link> | <Link to="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</Link>
    </td>
</tr>
    )}

function ExercisesList(props) {
    const [exerciseslist, setExercisesList] = useState({
        exercises: []
    })

    useEffect(() => {
      console.log('exercises-list component loaded');
        axios.get('http://localhost:5000/exercises/')
        .then(console.log('get req success'))
        .then(res => {
            setExercisesList({exercises: res.data})
            // console.log('success');
        })
        .catch(err => {console.log(err)})
      }, [])

    function deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))

        setExercisesList({
            exercises: exerciseslist.exercises.filter(el => el._id !== id)
        })
    }

    function exerciseList() {
        return exerciseslist.exercises.map(currentexercise => {
            return <Exercise 
            key={currentexercise._id}
            exercise={currentexercise} 
            deleteExercise={deleteExercise}
            />
        })
    }

    return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { exerciseList() }
            </tbody>
          </table>
        </div>
      )
}

export default ExercisesList