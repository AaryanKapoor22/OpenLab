import React from "react";
import { useNavigate } from "react-router-dom"
import Absent from "/absencetracking"; 
import Lab from "/labManager"



const professorDashboard = () => {

    //for navigation to different react pages
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const buttonAbsence = () => {
      navigate({Absent})
    }

    const buttonLabManager = () => {
      navigate({Lab})
    }

    return (
      <div>
        <div className="container">
          <div className="dashboard-container">
            <h1 className="dashboard-title">Instructor Home</h1>
            <div className="button-container">
              <button type="button" className="btn btn-primary btn-lg dashboard-button" onClick={buttonAbsence}>Absence Tracking</button>
              <button type="button" className="btn btn-secondary btn success btn-lg dashboard-button" onClick={buttonLabManager}>Manage Courses</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default professorDashboard;