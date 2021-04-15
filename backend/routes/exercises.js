const router = require("express").Router(); //requiring express router
let Exercise = require("../models/exercise.model"); //requiring mongoose model

//first endpoint to handle http get requests
router.route("/").get((req, res) => {
  // find() mongoose method that gets a lists the MongoDB atlas exercises, and returns a promise
  Exercise.find()
    .then((exercises) => res.json(exercises)) //returning exercises in json format
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

//second endpoint '/add' to handle http post requests
router.route("/add").post((req, res) => {
  // assigning req json data into variables
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  //creating new exercise object with the contents
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  //after saving user to the database
  newExercise
    .save()
    .then(() => res.json("Exercise added!")) //successfully added exercise
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

module.exports = router;
