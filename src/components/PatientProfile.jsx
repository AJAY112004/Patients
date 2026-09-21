import { CalendarDays, ChevronDown, Contact, HeartPulse, Phone } from 'lucide-react';

function formatDate(date) {
  if (!date) return 'Not available';

  const normalizedDate = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T00:00:00`
    : date;
  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) return 'Not available';
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(parsedDate);
}

function PatientProfile({ patient }) {
  return (
    <section className="profile-card">
      <img className="profile-photo" src={patient.profile_picture} alt={patient.name} />
      <h2>{patient.name}</h2>
      <div className="profile-details">
        <div><CalendarDays size={18} /><span>Date Of Birth<strong>{formatDate(patient.date_of_birth)}</strong></span></div>
        <div><Contact size={18} /><span>Gender<strong>{patient.gender || 'Not available'}</strong></span></div>
        <div><Phone size={18} /><span>Contact Info<strong>{patient.phone_number || 'Not available'}</strong></span></div>
        <div><HeartPulse size={18} /><span>Emergency Contacts<strong>{patient.emergency_contact || 'Not available'}</strong></span></div>
        <div><Contact size={18} /><span>Insurance Provider<strong>{patient.insurance_type || 'Not available'}</strong></span></div>
      </div>
      <button type="button" className="primary-button">Show All Information <ChevronDown size={16} /></button>
    </section>
  );
}

export default PatientProfile;
