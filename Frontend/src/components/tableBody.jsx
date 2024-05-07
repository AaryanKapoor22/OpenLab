import React, { Component } from 'react';
import UserContext from './UserContext';

class TableBody extends Component {
  static contextType = UserContext;

  componentDidUpdate(prevProps) {
    if (this.props.registeredSessions !== prevProps.registeredSessions) {
      this.forceUpdate();
    }
  }

  isSessionRegistered = (sessionId) => {
    console.log('registeredSessions:', this.props.registeredSessions);
    console.log('sessionId:', sessionId);
    return this.props.registeredSessions.some(session => session._id === sessionId);
  };

  render() {
    const { sessions, onDelete, setDisplay, showDelete } = this.props;
   return (
      <tbody>
        {sessions.map((session, index) => (
          <tr key={index}>
            <td style={{ padding: '10px' }}>{session.labName}</td>
            <td style={{ padding: '10px' }}>{new Date(session.labDate).toLocaleDateString()}</td>
            <td style={{ padding: '15px' }}>{new Date(session.labDate).toLocaleTimeString()}</td>
            <td style={{ padding: '10px' }}>{session.instructor ? `${session.instructor.firstName} ${session.instructor.lastName}` : 'No Instructor'}</td>
            <td style={{ padding: '10px' }}>{session.labLocation}</td>
            <td style={{ padding: '10px' }}>
              {setDisplay && (
                  <React.Fragment>
                    {this.props.showRegister && (
                      <button
                        style={{ margin: '5px', padding: '10px', backgroundColor: this.isSessionRegistered(session._id) ? 'lightgrey' : 'blue' }}
                        className="btn btn-primary"
                        onClick={() => this.props.onRegister ? this.props.onRegister(session._id, this.context._id) : console.log('Register function not provided')}
                        disabled={this.isSessionRegistered(session._id)}
                      >
                        {this.isSessionRegistered(session._id) ? 'Registered' : 'Register'}
                      </button>
                    )}
                    {showDelete && (
                      <button
                        style={{ margin: '5px', padding: '10px' }}
                        className="btn btn-danger"
                        onClick={() => onDelete(session._id)}
                      >
                        Delete
                      </button>
                    )}
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
  }
  
  export default TableBody;