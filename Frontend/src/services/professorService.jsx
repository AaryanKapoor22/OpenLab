
import http from "./httpService";
import { getJwt } from "./authService";
import * as config from "../config.json";
const { apiUrl } = config;

// a list of labs created by a single prof (proof of concept)
const apiEndpoint = apiUrl + "labs";

const labs = [
    {
        id: 1,
        title: "NUR330L",
        date: "November 10, 2024",
        time: "1:00-2:00am",
        instructor: "Professor Walker",
        room: "MNH360"
      },
      {
        id: 2,
        title: "NUR330L",
        date: "November 17, 2024",
        time: "1:00-2:00am",
        instructor: "Professor Walker",
        room: "MNH360"
      }, 
      {
        id: 3, 
        title: "NUR330L",
        date: "November 24, 2024",
        time: "1:00-2:00am",
        instructor: "Professor Walker",
        room: "MNH360"
      }
]; 

export function getLabs() {
    return labs;
  }

  
//   export function addLab(labId) {
//     http.setJwt(getJwt());
//     // for now, add to the list of labs
//     labs.push(labId);
//     // modify later 
//     return http.post(apiEndpoint, labId);
//   }
  

  // this would also have to be modified when adding auth. 
  export function addLab(lab) {
    const newId = labs.length + 1; 
    const newLab = {
        id: newId,
        title: lab.labName,
        date: lab.labDate,
        time: '1:00-2:00am',  // CHANGE THIS!!! 
        instructor: lab.instructor,
        room: lab.labLocation
    };
    labs.push(newLab);
}