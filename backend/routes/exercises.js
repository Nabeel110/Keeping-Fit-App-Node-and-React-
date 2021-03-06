const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
  Exercise.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) =>{
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const neweExercise = new Exercise({
    username,
    description,
    duration,
    date,
    });
  neweExercise.save()
        .then(() => res.json('Exercise  Added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

//  find exercise  by id
router.route('/:id').get((req,res) => {
  Exercise.findById(req.params.id)
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Deleting exercise by id
router.route('/:id').delete((req,res) =>{
  Exercise.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise Deleted'))
  .catch(err => res.status(400).json('Error: '+ err));
});



// For updating exercise

router.route('/update/:id').post((req,res) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = req.body.duration;
    exercise.date = req.body.date;

    exercise.save()
    .then(() => res.json('Exercise Updated!'))
    .catch(err => res.status(400).json('Error: '+err));
  })
   .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;
