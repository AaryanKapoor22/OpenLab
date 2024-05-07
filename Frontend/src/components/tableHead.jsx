import React from "react";
// This is the sample code from lesson videos. There's nothing fancy here.
// Adds headers to the table
const TableHead = () => {
  return (
    <thead>
      <tr>
        <th style={{ padding: '10px' }}>Title</th>
        <th style={{ padding: '10px' }}>Date</th>
        <th style={{ padding: '10px' }}>Time</th>
        <th style={{ padding: '10px' }}>Instructor</th>
        <th style={{ padding: '10px' }}>Location</th>
        <th style={{ padding: '10px' }}>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
