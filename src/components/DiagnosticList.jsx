function DiagnosticList({ diagnoses = [] }) {
  return (
    <section className="diagnostic-section">
      <h2>Diagnostic List</h2>
      <div className="table-card">
        <div className="diagnostic-table diagnostic-table--head">
          <span>Problem/Diagnosis</span><span>Description</span><span>Status</span>
        </div>
        {diagnoses.length > 0 ? diagnoses.map((diagnosis) => (
          <div className="diagnostic-table" key={`${diagnosis.name}-${diagnosis.status}`}>
            <strong>{diagnosis.name || 'Not available'}</strong>
            <span>{diagnosis.description || 'Not available'}</span>
            <span>{diagnosis.status || 'Not available'}</span>
          </div>
        )) : <p className="empty-message">No diagnostic information available.</p>}
      </div>
    </section>
  );
}

export default DiagnosticList;
