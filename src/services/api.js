const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev/';

export async function fetchPatients(signal) {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa('coalition:skills-test')}`,
      Accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Patient API returned ${response.status}.`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('Patient API returned an unexpected response.');
  }

  return payload;
}

export function findPatient(patients, name) {
  return patients.find((patient) => patient?.name?.toLowerCase() === name.toLowerCase());
}
