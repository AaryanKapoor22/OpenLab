// responsible for displaying the LabDashboard created by the professor
import TableHead from "./tableHead";
import React, { useEffect, useState } from 'react';
import {getLabs} from "../services/professorService";
import TableBody from "./tableBody";
import LabAdderForm from "./labAdderForm";
// right now, this is just for proof of concept
const LabDashboard = () => {

    const [sessions, setSessions] = useState([]); 
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        // add logic that checks if user's an admin or not
            // if (user is not an admin) {
            //   window.location = "/login";
            // } else {
            // sets the informtion based on whether user wants to access a missed or open lab
        
        fetchData();
    }, [updateCount]);


    async function fetchData() {
        const data = await getLabs();
         setSessions(data);
       }
    
    const handleLabAdded = () => {
        fetchData();  
        setUpdateCount(count => count + 1); 
    };

      return (
        <div className="container justify-content-center">
          <h1>Lab Dashboard</h1>
          <LabAdderForm  onLabAdded={handleLabAdded} />
          <TableHead />
          <TableBody  sessions={sessions} setDisplay={false}/>
        </div>
      );
    };
    
    export default LabDashboard;
    