import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { fetchPatients, findPatient } from './services/api';
import Header from './components/Header';
import PatientSidebar from './components/PatientSidebar';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';

const patientNames = [
  'Emily Williams',
  'Ryan Johnson',
  'Brandon Mitchell',
  'Jessica Taylor',
  'Samantha Johnson',
  'Ashley Martinez',
  'Olivia Brown',
  'Tyler Davis',
  'Kevin Anderson',
  'Dylan Thompson',
  'Nathan Evans',
  'Mike Nolan',
];

function App() {
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPatient() {
      try {
        const patients = await fetchPatients(controller.signal);
        const jessica = findPatient(patients, 'Jessica Taylor');
        if (!jessica) throw new Error('Jessica Taylor was not found in the API response.');
        setPatient(jessica);
        setStatus('ready');
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load patient data.');
          setStatus('error');
        }
      }
    }

    loadPatient();
    return () => controller.abort();
  }, []);

  const patientHistory = useMemo(() => patient?.diagnosis_history ?? [], [patient]);

  return (
    <div className="app-shell">
      <Header />
      {status === 'loading' && (
        <div className="state-panel" role="status">
          <LoaderCircle className="spin" size={24} />
          <span>Loading patient dashboard...</span>
        </div>
      )}
      {status === 'error' && (
        <div className="state-panel state-panel--error" role="alert">
          <AlertCircle size={24} />
          <div>
            <strong>We couldn&apos;t load the dashboard.</strong>
            <p>{error}</p>
          </div>
        </div>
      )}
      {status === 'ready' && (
        <main className="dashboard-layout">
          <PatientSidebar patients={patientNames} selectedName="Jessica Taylor" />
          <section className="content-column" aria-label="Patient diagnosis details">
            <DiagnosisHistory history={patientHistory} />
            <DiagnosticList diagnoses={patient.diagnostic_list} />
          </section>
          <aside className="profile-column">
            <PatientProfile patient={patient} />
            <LabResults results={patient.lab_results} />
          </aside>
        </main>
      )}
    </div>
  );
}

export default App;
