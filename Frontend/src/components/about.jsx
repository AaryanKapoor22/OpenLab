import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Assuming this import works in your React environment

const styles = {
  absenceTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
  },
  body: {
    backgroundImage: 'url("quinnipiac-background.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  absenceButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

function AbsenceTracker() {
  const [students, setStudents] = useState([
    {
      id: "date1",
      name: "John Doe",
      section: "NUR330L",
      absent: false,
      date: "",
    },
    {
      id: "date2",
      name: "Jane Smith",
      section: "NUR331L",
      absent: false,
      date: "",
    },
    {
      id: "date3",
      name: "Bob Johnson",
      section: "NUR330L",
      absent: false,
      date: "",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const markStudentAbsent = (id) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return { ...student, absent: true, date: today };
        }
        return student;
      })
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={styles.body}>
      <h2>Absence Tracking</h2>
      <div className="mb-3">
        <label htmlFor="searchName">Search by Name:</label>
        <input
          type="text"
          className="form-control"
          id="searchName"
          placeholder="Enter a name to search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table className="mt-3" style={styles.absenceTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Full Name</th>
            <th>Lab Section</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              style={student.absent ? { backgroundColor: "#f8f8f8" } : null}
            >
              <td>{student.date || "---"}</td>
              <td>{student.name}</td>
              <td>{student.section}</td>
              <td>
                <button
                  style={styles.absenceButton}
                  onClick={() => markStudentAbsent(student.id)}
                  disabled={student.absent}
                >
                  Mark Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AbsenceTracker;
