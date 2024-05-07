import http from "./httpService";

const apiEndpoint = "/labs/";

export async function getMissedLabs() {
  const { data: labs } = await http.get(apiEndpoint);
  return labs.filter((lab) => lab.labType === "Missed");
}

export async function getOpenLabs() {
  const { data: labs } = await http.get(apiEndpoint);
  return labs.filter((lab) => lab.labType === "Open");
}

export async function registerForLab(studentId, labId) {
  console.log(`Registering student ${studentId} for lab ${labId}`);
  try {
    await http.post(apiEndpoint + labId + "/registerLab/" + studentId);
    return alert("You have been registered Successfully!");
  } catch (error) {
    alert("You're already registered for this lab.");
    console.error(error.response.data.message);
  }
}
export async function getRegisteredLabs(studentId) {
  const { data: labs } = await http.get(
    apiEndpoint + "registered/" + studentId
  );
  return labs.map((lab) => lab.id);
}
