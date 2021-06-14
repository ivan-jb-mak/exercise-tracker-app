/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// exercise functional react component
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    // method to delete the exercise (with button)
    this.deleteExercise = this.deleteExercise.bind(this);

    // initializing the state (empty array of exercises)
    this.state = { exercises: [] };
  }

  // method to retrieve list of exercises from the database
  componentDidMount() {
    // get request to retrieve the list of exercises
    axios
      .get(`${process.env.REACT_APP_API_URL}/exercises/`)
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      // error handling
      .catch((error) => {
        console.log(error);
      });
  }

  // method to delete an exercise
  deleteExercise(id) {
    // delete request to delete from the list of exercises
    axios
      .delete(`${process.env.REACT_APP_API_URL}/exercises/` + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  //
  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
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
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
