import { Download } from 'lucide-react';

function LabResults({ results = [] }) {
  return (
    <section className="lab-card">
      <h2>Lab Results</h2>
      <ul>
        {results.length > 0 ? results.map((result) => (
          <li key={result}><span>{result}</span><button type="button" aria-label={`Download ${result}`}><Download size={18} /></button></li>
        )) : <li className="empty-message">No lab results available.</li>}
      </ul>
    </section>
  );
}

export default LabResults;
