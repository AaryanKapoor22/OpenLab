// Name: Aaryan, Kevin, Matt, and Camryn
// required imports for router 
var express = require('express');
let Attendance = require('../models/attendance');
var router = express.Router();
let labs = require('../models/labs');
let users = require('../models/users');

// Get and update lab roster 
router.route('/:labId')
  .get(async (req, res, next) => {
    try {
      const labId = req.params.labId;

      // Find the attendance for the lab and populate the studentId field
      const attendancee = await Attendance.findOne({ labId }).populate('absenceList.studentId', 'firstName lastName');

      // ensures a roster exists 
      if (!attendancee) {
        return res.status(404).json({ message: 'Lab attendance not found' });
      }

      // display roster
      res.json(attendancee.absenceList);
    } catch (e) {
      console.error("Error retrieving lab roster", e);
      res.status(500).send("Internal server error");
    }
  });
// Update attendance for a student in a section
router.route('/:sectionId/:studentId')
  .put(async (req, res, next) => {
    try {
      const { sectionId, studentId } = req.params;
      const { status } = req.body; // New attendance status

      // Find the attendance for the section
      const attendance = await Attendance.findOne({ labId: sectionId });

      if (!attendance) {
        return res.status(404).json({ message: 'No section with that ID found' });
      }

      // Find the student in the absenceList
      const studentIndex = attendance.absenceList.findIndex(student => student.studentId.toString() === studentId);

      if (studentIndex === -1) {
        return res.status(404).json({ message: 'gNo student with that ID found in the section' });
      }

      // Update the student's attendance status
      attendance.absenceList[studentIndex].status = status;

      // Save the updated attendance
      await attendance.save();

      res.json({ message: 'Attendance updated successfully' });
    } catch (e) {
      console.error("Error updating attendance", e);
      res.status(500).send("Internal server error");
    }
  });

// Delete all students from a section
router.route('/:sectionId/clear')
  .delete(async (req, res, next) => {
    try {
      const sectionId = req.params.sectionId;

      // Find the attendance for the section
      const attendance = await Attendance.findOne({ labId: sectionId });

      if (!attendance) {
        return res.status(404).json({ message: 'No section with that ID found' });
      }

      // Clear the absenceList
      attendance.absenceList = [];

      // Save the updated attendance
      await attendance.save();

      res.json({ message: 'All students removed from the section successfully' });
    } catch (e) {
      console.error("Error removing students", e);
      res.status(500).send("Internal server error");
    }
  });


  module.exports = router;