const router = require("express").Router(); //requiring express router
let Exercise = require("../models/exercise.model"); //requiring mongoose model

//endpoint to handle http get requests
router.route("/").get((req, res) => {
  // find() mongoose method that gets a lists the MongoDB atlas exercises, and returns a promise
  Exercise.find()
    .then((exercises) => res.json(exercises)) //returning exercises in json format
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

//endpoint '/add' to handle http post requests
router.route("/add").post((req, res) => {
  // assigning req json data into variables
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  //creating new exercise object with the contents above
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

// endpoint '/:id' to filter get requests by id
router.route("/:id").get((req, res) => {
  //find the exersice by id and filters the data
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

// endpoint '/:id' to delete requests
router.route("/:id").delete((req, res) => {
  //find the exersice by id and deletes it
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted.")) //message to show succesful deletion
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

// endpoint '/update/:id' to post update requests
router.route("/update/:id").post((req, res) => {
  //finds exersice by id and updates it
  Exercise.findById(req.params.id).then((exercise) => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise
      .save()
      .then(() => res.json("Exercise updated!"))
      .catch((err) => res.status(400).json("Error: " + err)); //error handling
  });
});

module.exports = router;
