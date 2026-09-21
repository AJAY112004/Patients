import { Search } from 'lucide-react';

function PatientSidebar({ patients, selectedName }) {
  return (
    <aside className="patient-sidebar">
      <div className="section-heading">
        <h1>Patients</h1>
        <button type="button" className="icon-button" aria-label="Search patients">
          <Search size={20} />
        </button>
      </div>
      <ul className="patient-list">
        {patients.map((name) => (
          <li className={name === selectedName ? 'patient-row patient-row--selected' : 'patient-row'} key={name}>
            <img src={`https://i.pravatar.cc/80?u=${encodeURIComponent(name)}`} alt="" />
            <span>{name}</span>
            <button type="button" className="row-more" aria-label={`More options for ${name}`}>
              <span />
              <span />
              <span />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default PatientSidebar;
