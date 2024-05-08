// Name: Aaryan, Kevin, Matt, and Camryn
var express = require('express');
var router = express.Router();
let Lab = require('../models/labs');
let User = require('../models/users');
let Attendance = require('../models/attendance');

// Retrieves all the labs
router.get('/', async (req, res, next) => {
  try {
    const labs = await Lab.find().populate('instructor', 'firstName lastName');
    res.json(labs);
  } catch (e) {
    console.log("Error fetching labs with instructor details:", e);
    res.status(500).send("Internal server error");
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log("Received data:", req.body);
    const user = await User.findById(req.body.instructor);
    console.log("User found:", user);

    const lab = await Lab.create(req.body);
    console.log("Lab created:", lab);

    // Create a new Attendance document with an empty absenceList array
    const attendance = new Attendance({
      labId: lab._id,
      absenceList: []
    });

    await attendance.save();
    console.log("Attendance initialized for the lab");

    res.status(201).send(`Added the following lab with the following id: ${lab._id}`);
  } catch (e) {
    console.log("Failed to save data in db", e);
    res.status(500).send("Internal server error");
  }
});



//Registers lab - route had to be modified in order to add a student 
router.route('/:labId/registerLab/:studentId')
  .post(async (req, res, next) => {
    try {
      const labId = req.params.labId;
      const studentId = req.params.studentId;

      // checks if Attendance for the Lab exists
      let attendancee = await Attendance.findOne({ labId });

      if (!attendancee) {
        // if not, create one 
        attendancee = new Attendance({
          labId: labId,
          absenceList: []
        });
      }

      // Check if the student is already registered for the lab
      const isAlreadyRegistered = attendancee.absenceList.some(absence => absence.studentId.toString() === studentId);

      if (isAlreadyRegistered) {
        // If the student is already registered, return an error message
        res.status(400).json({ message: 'You are already registered for this lab.' });
        return;
      }

      // If the student is not already registered, register them for the lab
      attendancee.absenceList.push({ status: 'absent', studentId });

      await attendancee.save();

      res.json({ message: 'User registered for the lab successfully' });
    } catch (e) {
      console.error("Error registering for lab", e);
      res.status(500).send("Internal server error");
    }
  });

 

// Delete a lab 
router.route('/:labId')
  .delete(async (req, res, next) => {
    try {
      const labId = req.params.labId;

      // Delete the lab
      await Lab.findByIdAndDelete(labId);

      res.json({ message: 'Lab deleted successfully' });
    } catch (e) {
      console.error("Error deleting lab", e);
      res.status(500).send("Internal server error");
    }
  })
  // Update lab details 
  .put(async (req, res, next) => {
    try {
      const labId = req.params.labId;
      const updates = req.body;

      // Update the lab
      const updatedLab = await Lab.findByIdAndUpdate(labId, updates, { new: true });

      res.json(updatedLab);
    } catch (e) {
      console.error("Error updating lab", e);
      res.status(500).send("Internal server error");
    }
  });

// Get labs created by an instructor 
router.route('/:userId')
  .get(async (req, res, next) => {
    try {
      const userId = req.params.userId;

      // Find labs created by the instructor
      const instructorLabs = await Lab.find({ instructor: userId });

      res.json(instructorLabs);
    } catch (e) {
      console.error("Error retrieving instructor's labs", e);
      res.status(500).send("Internal server error");
    }
  });


  router.get('/instructors', async (req, res) => {
    const instructors = await users.find({ role: 'admin' }); // Assuming 'admin' role means instructor
    res.send(instructors);
  });

  router.get('/registered/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      // Find labs registered by the user
      const registeredLabs = await Lab.find({ registeredUsers: id });
      res.json(registeredLabs);
    } catch (e) {
      console.error("Error retrieving registered labs", e);
      res.status(500).send("Internal server error");
    }
  });
module.exports = router;