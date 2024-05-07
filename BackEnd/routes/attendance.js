var express = require('express');
let Attendance = require('../models/attendance');
let User = require('../models/users'); // Assuming you have a User model
var router = express.Router();

// Get and update attendance for a section
router.route('/:sectionId')
  .get(async (req, res, next) => {
    try {
      const sectionId = req.params.sectionId;

      // Find the attendance for the section and populate the studentId field
      const attendance = await Attendance.findOne({ labId: sectionId }).populate('absenceList.studentId');

      if (!attendance) {
        return res.status(404).json({ message: 'No section with that ID found' });
      }

      if (!attendance.absenceList || attendance.absenceList.length === 0) {
        return res.status(200).json({ message: 'No students in that section', students: [] });
      }

      // Map over the absenceList and replace the studentId with the student's name
      const students = attendance.absenceList.map(student => ({
        status: student.status,
        studentId: student.studentId._id, // Assuming the User model has an _id field
        firstName: student.studentId.firstName, // From the User model
        lastName: student.studentId.lastName, // From the User model
        isPresent: student.isPresent // From the Attendance model
      }));

      res.json({ students });
    } catch (e) {
      console.error("Error retrieving attendance", e);
      res.status(500).send("Internal server error");
    }
  })

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