import React, { Component } from "react";

import { Link } from 'react-router-dom'; // keep for now... this will be useful later on

class TableBody extends Component {
  render() {
  const {sessions, setDisplay } = this.props; 
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
               {/* Only display the button in the labs component (saves time to not hard code more components similar to this.) */}
              {
                setDisplay && (
                  <button
                  style={{ margin: '5px', padding: '10px' }}
                  className="btn btn-primary"
                  onClick ={ () => this.props.onClick(session) }
                  >
                  Register
                </button>
                )
              }
            </td>
          </tr>
        ))}
      </tbody>
  );
  }
};

export default TableBody;
