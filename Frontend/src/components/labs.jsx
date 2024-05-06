import React, { useEffect, useState } from 'react';
import TableHead from '../components/tableHead';
import TableBody from '../components/tableBody';
import auth from "../services/authService";
import { getOpenLabs } from '../services/openLabs';
import { getMissedLabs } from '../services/missedLabs';

const Labs = () => {
  // https://stackoverflow.com/questions/58227499/is-there-a-way-of-using-the-usestate-hook-to-toggle-classname-in-react
  const [activeTab, setActiveTab] = useState('missed');
  // for the list of labs 
  const [sessions, setSessions] = useState([]); 
  // for modal logic: https://www.geeksforgeeks.org/how-to-pass-data-to-a-react-bootstrap-modal/
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);


  useEffect(() => {
      // only registered users can access this page (uncomment when whole application is ready)

    // if (!auth.getCurrentUser()) {
    //   console.log("no user");
    //   window.location = "/login";
    // } else {
      // sets the informtion based on whether user wants to access a missed or open lab
      async function fetchData() {
        const data = activeTab === 'missed' ? await getMissedLabs() : await getOpenLabs();
        setSessions(data);
      }
      fetchData();
   // }
  }, [activeTab]); 

  // logic for modal that displays the lab details user signed up for

  // onClick for register button 
  const handleRegister = (session) => {
    setSelectedSession(session);
    setModalVisible(true);
  };
  // for if user cancels registration
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // confirms registration
  const handleConfirmation = () => {
    // can be something as simple as a adding alert 
    alert("Registration Confirmed!");
    setModalVisible(false);
  }

  return (
    <div className="container-fluid">
      <ul className="nav nav-pills justify-content-center" style={{ margin: '10px' }}>
        {/* https://stackoverflow.com/questions/72707446/use-ternary-operator-to-change-classname-in-react */}
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'missed' ? 'active' : ''}`} onClick={() => setActiveTab('missed')}>Missed</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>Open</button>
        </li>
      </ul>
      <TableHead />
      <TableBody activeTab={activeTab} sessions={sessions} onClick={handleRegister}  setDisplay={true} />
         {/* Based on the modal and the exact lab session clicked, display the corresponding information 
         https://getbootstrap.com/docs/5.0/components/modal/#fullscreen-modal
         */}
      {modalVisible && selectedSession && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedSession.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Date: {selectedSession.date}</p>
                <p>Time: {selectedSession.time}</p>
                <p>Instructor: {selectedSession.instructor}</p>
                <p>Room: {selectedSession.room}</p>
                <strong>Are you sure you wish to confirm your booking?</strong>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmation}>Confirm Registration</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Labs;
