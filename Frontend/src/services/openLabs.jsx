// following is the collection of open labs (from last semester's front end)
const openLabs =  [
    { id: 1, title: "Basic Nursing Skills", date: "December 5, 2024", time: "9:00 AM - 11:00 AM", instructor: "Dr. Emily Johnson", room: "204A", skills: "BLS, IV Therapy, Wound Care" },
    { id: 2, title: "Advanced Procedures", date: "December 25, 2024", time: "1:00 PM - 3:00 PM", instructor: "Prof. Michael Smith", room: "204B", skills: "Patient Assessment, Medication Admin, Catheterization" },
    { id: 3, title: "Cardiovascular and Diabetes Care", date: "December 31, 2024", time: "10:00 AM - 12:00 PM", instructor: "Dr. Lisa Ray", room: "205", skills: "Blood Pressure, EKG, Diabetes Management" }
  ]

  export function getOpenLabs() {
    return openLabs;
  }