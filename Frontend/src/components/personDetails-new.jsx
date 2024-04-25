import React, { useEffect,useState } from "react";
import { getPerson, savePerson } from "../service/PeopleService";

import {useParams} from "react-router-dom";



const PersonDetails= () => {
  const [person, setPerson] = useState("");
  const {id} = useParams();

  async function handleUpate(curPerson){
    curPerson.name = "Updated";
    const { data: person } = await savePerson(curPerson);
    setPerson(person);
  };
  
    useEffect( ()=> {
      async function fetchData() {
        // You can await here
        const { data: person } = await getPerson(id);
        if (!person) return this.props.history.replace("/not-found");
        //this.setState({ person });
        setPerson(person);
      }
       fetchData();
      

    },[id])
//    const { person } = this.state;
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleUpate(person);
          }}
        >
          {" "}
          Update{" "}
        </button>
        <h3>Person Details</h3>
        <div>id: {person.id}</div>
        <div>Name: {person.name}</div>
        <div>phone : {person.phone}</div>
      </div>
    );
  }
export default PersonDetails;

