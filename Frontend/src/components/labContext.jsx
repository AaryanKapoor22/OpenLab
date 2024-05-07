import React from 'react';

export const LabContext = React.createContext({
  registeredSessions: [],
  setRegisteredSessions: () => {},
});