import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // keep for now... this will be useful later on
import { getOpenLabs } from '../services/openLabs';
import { getMissedLabs } from '../services/missedLabs';

const TableBody = ({ activeTab }) => { 
  // way of getting the sessions based on the active tab
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    // get the current tab and set the sessions accordingly
    if (activeTab === 'missed') {
      setSessions(getMissedLabs());
    } else {
      setSessions(getOpenLabs());
    }
  }); 

  return (
    <tbody>
      {/* Display the corresponding information */}
      {sessions.map((session, index) => (
        <tr key={index}>
        <td style={{ padding: '10px' }}>{session.title}</td>
        <td style={{ padding: '10px' }}>{session.date}</td>
        <td style={{ padding: '15px' }}>{session.time}</td>
        <td style={{ padding: '10px' }}>{session.instructor}</td>
        <td style={{ padding: '10px' }}>{session.room}</td>
        <td style={{ padding: '10px' }}>
          {/* Button only sends user to school of nursing site for now */}
          <button
            style={{ margin: '5px', padding: '10px' }}
            className="btn btn-primary"
            onClick={() => window.location.href = 'https://www.qu.edu/schools/nursing/'}
          >
            Register
          </button>
        </td>
      </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
