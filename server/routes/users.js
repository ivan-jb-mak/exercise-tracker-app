const router = require("express").Router(); //requiring express router
let User = require("../models/user.model"); //requiring mongoose model

//first endpoint to handle http get requests
router.route("/").get((req, res) => {
  // find() mongoose method that gets a lists the MongoDB atlas users, and returns a promise
  User.find()
    .then((users) => res.json(users)) //returning users in json format
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

//second endpoint '/add' to handle http post requests
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username }); //creating new instance of User with username

  //after saving user to the database
  newUser
    .save()
    .then(() => res.json("User added!")) //successfully creating user
    .catch((err) => res.status(400).json("Error: " + err)); //error handling
});

module.exports = router;
