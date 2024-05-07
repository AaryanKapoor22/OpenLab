import React, { useEffect, useState } from "react";
import auth from "./services/authService";
import TableBody from './components/tableBody';
import TableHead from './components/tableHead';

const Table = () => {
  const [registeredSessions, setRegisteredSessions] = useState(
    JSON.parse(localStorage.getItem('registeredSessions')) || []
  );

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      console.log("no user");
      window.location = "/login";
    }
  }, []);

  const handleRegister = (id) => {
    console.log(`Registering for id: ${id}`);
    // Add your registration logic here
    // After successful registration, update the registeredSessions state
    const newRegisteredSessions = [...registeredSessions, id];
    setRegisteredSessions(newRegisteredSessions);
    localStorage.setItem('registeredSessions', JSON.stringify(newRegisteredSessions));
  };

  return (
    <table>
      <TableHead />
      <TableBody onRegister={handleRegister} registeredSessions={registeredSessions} />
    </table>
  );
};

export default Table;