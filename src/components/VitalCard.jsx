function VitalCard({ icon: Icon, tone, title, data, unit }) {
  return (
    <article className={`vital-card vital-card--${tone}`}>
      <div className="vital-icon"><Icon size={22} strokeWidth={2.2} /></div>
      <h3>{title}</h3>
      <strong>{data?.value ?? 'Not available'} <small>{data?.value != null ? unit : ''}</small></strong>
      <span className="vital-status">{data?.levels ?? 'Not available'}</span>
    </article>
  );
}

export default VitalCard;
