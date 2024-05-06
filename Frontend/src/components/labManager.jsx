import React, { useEffect, useState } from 'react';
import { getLabManagerInfo } from "../services/labManagerInfo";

const LabManager = () =>{

  const [labManagerInfo, setLabManagerInfo] = useState([]);
  const [toggle, setToggle] = useState(false)

  async function fetchData() {
    const info = await getLabManagerInfo();
    setLabManagerInfo(info);
  }
  useEffect(() => {
   
    // get the lab manger info (this is a dummy data for now)
    fetchData();
  }, []); 
  
  // this is for the edit button 
  // https://dommagnifi.co/2020-12-03-toggle-state-with-react-hooks/ was used as a resource

 const buttonToggler = () => {
  setToggle(true);
 }
 const saveButtonToggle = () => {
  setToggle(false);
  // save function for when connected to back end can be inserted here? (not there yet)
 }


 // code for deleting lab 
const handleDelete = (id) => {
  const newLabs = labManagerInfo.filter(lab => lab.id !== id);
  setLabManagerInfo(newLabs);
  try {
    // delete the lab (add auth later on)
  } catch (ex) {
    console.log("delete exception");
    if (ex.respond && ex.respond.status === 404) {
      alert("Lab has already been deleted !");
      
    }
  }
};
      return (
        <div>
          <div className="container-fluid">
            <ul className="nav nav-pills justify-content-center" id="nav">
              <li className="nav-item">
                <h1>Lab Manager</h1>
              </li>
            </ul>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Date</th>
                <th scope="col">Instructor</th>
              </tr>
            </thead>
            <tbody>
            {/* Loop through the dummy data passed in */}
            {labManagerInfo.map((lab, index) => (
              <tr key={index}>
                <td  contentEditable={toggle}>{lab.section}</td>
                <td contentEditable={toggle}>{lab.date}</td>
                <td contentEditable={toggle}>{lab.instructor}</td>
                <td>
                  {/* Lab is deleted */}
                <button className="btn btn-danger" onClick={() => handleDelete(lab.id)}>
                  Delete
                </button>
              </td>
            </tr>
            ))}
            </tbody>
          </table>
          <div className="buttons-container">
          {!toggle ? (
          <button type="button" className="btn btn-primary" onClick={buttonToggler}>Edit</button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={saveButtonToggle}>Save</button>
        )}
           
          </div>
        </div>
      );
}


export default LabManager;