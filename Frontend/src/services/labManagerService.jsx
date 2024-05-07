import http from "./httpService"; 

const apiEndpoint = "/labs/";

export function getLabs() {
  return http.get(apiEndpoint);
}

export function createLab(data) {
    const labData = {
      instructor: data.instructor, // changed from instructorId to instructor
      labType: data.labType,
      labCapacity: data.labCapacity,
      labLocation: data.labLocation,
      labDate: data.labDate,
      labName: data.labName
    };
    return http.post(apiEndpoint, labData);
}

export function deleteLab(labId) {
  return http.delete(apiEndpoint + labId);
}
export function getInstructors() {
    return http.get("/users/instructors"); 
  }

export function registerLab(labId, studentId) {
  return http.post(`${apiEndpoint}${labId}/registerLab/${studentId}`);
}
