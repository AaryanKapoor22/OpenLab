import React from "react";
import { useNavigate } from "react-router-dom"
import Absent from "./absencetracking"
import Lab from "./labManager";



const professorDashboard = () => {

    //for navigation to different react pages
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const buttonAbsence = () => {
      navigate("/absence")
    }

    const buttonLabManager = () => {
      navigate("/labProf")
    }

    return (
      // hopefully this will slightly center it? 
      <div className="container align-items-center justify-content-center" style={{ paddingTop: '60px' }}>
      <div className="text-center">
        <h1 className="dashboard-title mb-3">Instructor Dashboard</h1>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary btn-lg mx-2" onClick={buttonAbsence}>Absence Tracking</button>
          <button type="button" className="btn btn-success btn-lg mx-2" onClick={buttonLabManager}>Manage Courses</button>
        </div>
      </div>
    </div>
    );
}

export default professorDashboard;