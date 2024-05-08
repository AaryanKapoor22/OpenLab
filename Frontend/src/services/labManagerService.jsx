/* 
Name: Kevin, Matt, Aaryan, Camryn
service that's responsible with lab data 
*/
import http from "./httpService"; 
// based on the route from the backend
const apiEndpoint = "/labs/";

// get the labs
export function getLabs() {
  return http.get(apiEndpoint);
}

// create a lab
export function createLab(data) {
    const labData = {
      instructor: data.instructor, 
      labType: data.labType,
      labCapacity: data.labCapacity,
      labLocation: data.labLocation,
      labDate: data.labDate,
      labName: data.labName
    };
    return http.post(apiEndpoint, labData);
}

// delete a lab
export function deleteLab(labId) {
  return http.delete(apiEndpoint + labId);
}
// get instructors
export function getInstructors() {
    return http.get("/users/instructors"); 
  }

  // register a student for a lab
export function registerLab(labId, studentId) {
  return http.post(`${apiEndpoint}${labId}/registerLab/${studentId}`);
}
