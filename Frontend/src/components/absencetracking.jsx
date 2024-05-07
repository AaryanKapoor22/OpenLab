import React, { useState, useEffect } from 'react';
import '../index.css';

function AbsenceTracking() {
  const [attendance, setAttendance] = useState([]);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const labsResponse = await fetch('http://localhost:3000/labs');
      const labsData = await labsResponse.json();
      setLabs(labsData);
    
      if (labsData.length > 0) {
        const attendanceData = await Promise.all(labsData.map(async lab => {
          const attendanceResponse = await fetch(`http://localhost:3000/attendance/${lab._id}`);
          return attendanceResponse.json();
        }));
    
        const attendance = attendanceData.map(section => ({
          ...section,
          students: section.map(student => ({
            studentId: student.studentId._id, // Assuming studentId is an object with _id property
            firstName: student.studentId.firstName,
            lastName: student.studentId.lastName,
            status: student.status,
            toggled: student.status // Preserve original status
          }))
        }));
    
        setAttendance(attendance);
        console.log(attendance); // Log the attendance object
      }
    };
  
    fetchData();
  }, []);

  // Function to toggle student status
  const toggleStatus = (sectionIndex, studentIndex) => {
    const newAttendance = [...attendance];
    const student = newAttendance[sectionIndex].students[studentIndex];
    const newStatus = student.status === 'present' ? 'absent' : 'present'; // Toggle status
    student.status = newStatus;
    setAttendance(newAttendance);

    // Update the backend
    const labId = labs[sectionIndex]._id;
    const studentId = student.studentId; // Assuming each student has a unique studentId
    fetch(`http://localhost:3000/attendance/${labId}/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }) // Send the new status
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Attendance</h2>
      {attendance.map((section, sectionIndex) => (
        <details key={sectionIndex} className="detailsSummary">
          <summary>{labs[sectionIndex]?.labName || 'Unknown Lab'}</summary>
          {section.students && section.students.length > 0 ? (
            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Action</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {section.students.map((student, studentIndex) => (
                    <tr key={studentIndex}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.status}</td>
                      <td>
                        <button
                          onClick={() => toggleStatus(sectionIndex, studentIndex)}
                          style={{
                            backgroundColor: student.status === 'present' ? 'lightblue' : 'red',
                            color: 'white',
                            borderRadius: '20px', // Makes the button round
                            padding: '5px 10px', // Adjust padding to maintain shape and readability
                            border: 'none', // Removes the default border
                            cursor: 'pointer' // Changes cursor on hover to indicate it's clickable
                          }}
                        >
                          {student.status === 'present' ? 'Mark Absent' : 'Mark Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>{section.message || 'No students in that section'}</p>
          )}
        </details>
      ))}
    </div>
  );
}

export default AbsenceTracking;