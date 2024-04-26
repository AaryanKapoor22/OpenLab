import React, { useState } from 'react';
import TableHead from '../components/tableHead';
import TableBody from '../components/tableBody';

// labs table that displays a list of missed and open labs
const Labs = () => {
// set to missed by default 
  const [activeTab, setActiveTab] = useState('missed');

  return (
    <div className="container-fluid">
      <ul className="nav nav-pills justify-content-center" style={{ margin: '10px' }}>
        <li className="nav-item">
        {/* https://stackoverflow.com/questions/72707446/use-ternary-operator-to-change-classname-in-react */}
          <button className={`nav-link ${activeTab === 'missed' ? 'active' : ''}`} onClick={() => setActiveTab('missed')}>Missed</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>Open</button>
        </li>
      </ul>
      <TableHead/>
      <TableBody activeTab={activeTab}/>
    </div>
  );
};

export default Labs;
