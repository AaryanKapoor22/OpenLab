/* 
Name: Kevin, Matt, Aaryan, Camryn
AbscenceTracking: responsible for tracking registered student attendance for labs (ADMIN ONLY)
*/
import React, { useState, useEffect } from "react";
import "../index.css";

function AbsenceTracking() {
  // states that store attendance and labs data
  const [attendance, setAttendance] = useState([]);
  const [labs, setLabs] = useState([]);

  // Fetch labs and attendance data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const labsResponse = await fetch(
        "https://backend-openlab.vercel.app/labs"
      );
      const labsData = await labsResponse.json();
      setLabs(labsData);

      if (labsData.length > 0) {
        const attendanceData = await Promise.all(
          labsData.map(async (lab) => {
            const attendanceResponse = await fetch(
              `https://backend-openlab.vercel.app/attendance/${lab._id}`
            );
            return attendanceResponse.json();
          })
        );

        // retrieve registered students
        const attendance = attendanceData.map((section) => ({
          ...section,
          students: section.map((student) => ({
            studentId: student.studentId._id,
            firstName: student.studentId.firstName,
            lastName: student.studentId.lastName,
            status: student.status,
            toggled: student.status,
          })),
        }));

        setAttendance(attendance);
        console.log(attendance);
      }
    };

    fetchData();
  }, []);

  // Function to toggle student status
  const toggleStatus = (sectionIndex, studentIndex) => {
    const newAttendance = [...attendance];
    const student = newAttendance[sectionIndex].students[studentIndex];
    const newStatus = student.status === "present" ? "absent" : "present"; // Toggle status
    student.status = newStatus;
    setAttendance(newAttendance);

    // Update the backend based on student attendance for that lab
    const labId = labs[sectionIndex]._id;
    const studentId = student.studentId;
    fetch(
      `https://backend-openlab.vercel.app/attendance/${labId}/${studentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // errors
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Attendance</h2>
      {/* Display the labs */}
      {attendance.map((section, sectionIndex) => (
        <details key={sectionIndex} className="detailsSummary">
          <summary>{labs[sectionIndex]?.labName || "Unknown Lab"}</summary>
          {section.students && section.students.length > 0 ? (
            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Action</th>{" "}
                    {/* Delete's the only action we have implemented so far. */}
                  </tr>
                </thead>
                <tbody>
                  {/* Display students based on their corresponding registered lab */}
                  {section.students.map((student, studentIndex) => (
                    <tr key={studentIndex}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.status}</td>
                      <td>
                        {/* Responsible for allowing admin to mark a student present or absent */}
                        <button
                          onClick={() =>
                            toggleStatus(sectionIndex, studentIndex)
                          }
                          style={{
                            backgroundColor:
                              student.status === "present"
                                ? "lightblue"
                                : "red",
                            color: "white",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {student.status === "present"
                            ? "Mark Absent"
                            : "Mark Present"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>{section.message || "No students in that section"}</p>
          )}
        </details>
      ))}
    </div>
  );
}

export default AbsenceTracking;
