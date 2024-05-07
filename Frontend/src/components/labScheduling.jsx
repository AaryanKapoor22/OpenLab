import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableHead from './tableHead';
import TableBody from './tableBody';
import { LabContext } from './labContext';
import { getMissedLabs, getOpenLabs, registerForLab } from '../services/LabSchedulingService';

const Labs = () => {
  const [activeTab, setActiveTab] = useState('missed');
  const [sessions, setSessions] = useState([]); 
  const { registeredSessions, setRegisteredSessions } = useContext(LabContext);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (activeTab === 'missed') {
        data = await getMissedLabs();
      } else if (activeTab === 'open') {
        data = await getOpenLabs();
      }
      setSessions(data);
    };

    fetchData();
  }, [activeTab]);

  const handleRegister = async (sessionId, userId) => {
    // Check if the user is already registered for the lab
    if (registeredSessions.includes(sessionId)) {
      // If the user is already registered, display a message and return early
      console.log("You're already registered for this lab.");
      toast.error("You're already registered for this lab.");
      return;
    }
  
    // If the user is not already registered, attempt to register them for the lab
    try {
      await registerForLab(userId,sessionId);

      console.log(userId);
      console.log(sessionId);
      setRegisteredSessions(prevRegisteredSessions => [...prevRegisteredSessions, sessionId]);
      toast.success("You've successfully registered for the lab.");
    } catch (ex) {
      toast.error("An error occurred while registering for the lab.");
    }
  };

  const isLabRegistered = (labId) => {
    return registeredSessions.includes(labId);
  };

  return (
    <div className="container-fluid">
      <ul className="nav nav-pills justify-content-center" style={{ margin: '10px' }}>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'missed' ? 'active' : ''}`} onClick={() => setActiveTab('missed')}>Missed</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>Open</button>
        </li>
      </ul>
      <TableHead />
      <TableBody 
        sessions={sessions}
        onRegister={handleRegister}
        setDisplay={true}
        showRegister={true}
        showDelete={false} 
        registeredSessions={registeredSessions}
      />
    </div>
  );
};

export default Labs;
