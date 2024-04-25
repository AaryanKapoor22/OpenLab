import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPerson, savePerson } from "./../service/PeopleService";
const PersonDetails = () => {
  const [person, setPerson] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      // /users/1
      console.log("fetch");
      const { data: person } = await getPerson(id);
      if (!person) return this.props.history.replace("/not-found");
      setPerson(person);
    }
    fetchData();
  }, [id]);
  const handleUpdate = async (curPerson) => {
    curPerson.name = "updated";
    const { data: newPerson } = await savePerson(curPerson);
    console.log(newPerson);
    setPerson(newPerson);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleUpdate(person)}>
        Update
      </button>
      <h3>Person Details</h3>
      <div>id: {person.id}</div>
      <div>Name: {person.name}</div>
      <div>phone: {person.phone}</div>
    </div>
  );
};

export default PersonDetails;
