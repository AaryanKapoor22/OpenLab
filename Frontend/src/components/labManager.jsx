import React, { useEffect, useState } from 'react';
import { getLabs, createLab, deleteLab, registerLab } from "../services/labManagerService";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import LabAdderForm from "./CreateLabForm";

const LabManager = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const { data } = await getLabs();
      console.log("Labs data:", data);  // Check the structure of 'data'
      setSessions(data);
    } catch (err) {
      setError("Failed to fetch labs.");
      console.error("Fetching labs failed:", err);
    }
  };

  const handleLabAdded = async (labData) => {
    try {
      await createLab(labData);
      fetchLabs();
    } catch (err) {
      setError("Adding lab failed.");
      console.error("Adding lab failed:", err);
    }
  };

  const handleLabDelete = async (labId) => {
    try {
      await deleteLab(labId);
      fetchLabs();
    } catch (err) {
      setError("Failed to delete lab.");
      console.error("Deleting lab failed:", err);
    }
  };

  const handleRegister = async (labId, studentId) => {
    try {
      await registerLab(labId, studentId);
      fetchLabs();
    } catch (err) {
      setError("Failed to register student.");
      console.error("Registering student failed:", err);
    }
  };

  return (
    <div className="container justify-content-center">
      <h1>Lab Manager</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <LabAdderForm onLabAdded={handleLabAdded} />
      <TableHead />

      <TableBody
        sessions={sessions}
        onDelete={handleLabDelete}
        onRegister={handleRegister}
        setDisplay={true}
        showDelete={true}
      />
    </div>
  );
};

export default LabManager;