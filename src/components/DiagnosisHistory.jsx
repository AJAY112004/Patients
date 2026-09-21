import { Activity, Thermometer, Wind } from 'lucide-react';
import BloodPressureChart from './BloodPressureChart';
import VitalCard from './VitalCard';

function DiagnosisHistory({ history }) {
  const latest = history.at(-1) ?? {};

  return (
    <section className="diagnosis-section">
      <h2>Diagnosis History</h2>
      <BloodPressureChart history={history} />
      <div className="vitals-grid">
        <VitalCard icon={Wind} tone="blue" title="Respiratory Rate" data={latest.respiratory_rate} unit="bpm" />
        <VitalCard icon={Thermometer} tone="orange" title="Temperature" data={latest.temperature} unit="°F" />
        <VitalCard icon={Activity} tone="pink" title="Heart Rate" data={latest.heart_rate} unit="bpm" />
      </div>
    </section>
  );
}

export default DiagnosisHistory;
