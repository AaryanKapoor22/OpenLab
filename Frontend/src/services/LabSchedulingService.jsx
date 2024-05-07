import http from "./httpService";

const apiEndpoint = "/labs/";

export async function getMissedLabs() {
  const { data: labs } = await http.get(apiEndpoint);
  return labs.filter(lab => lab.labType === "Missed");
}

export async function getOpenLabs() {
  const { data: labs } = await http.get(apiEndpoint);
  return labs.filter(lab => lab.labType === "Open");
}

export async function registerForLab(studentId, labId) {
  console.log(`Registering student ${studentId} for lab ${labId}`);
  try {
    return await http.post(apiEndpoint + labId + "/registerLab/" + studentId);
  } catch (error) {
    console.error(error.response.data.message);
  }
}
export async function getRegisteredLabs(studentId) {
  const { data: labs } = await http.get(apiEndpoint + "registered/" + studentId);
  return labs.map(lab => lab.id);
}