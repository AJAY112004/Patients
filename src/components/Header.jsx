import { MoreHorizontal, Settings } from 'lucide-react';

const navigationItems = ['Overview', 'Patients', 'Schedule', 'Message', 'Transactions'];

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Tech.Care home">
        <span className="brand-mark" aria-hidden="true">+</span>
        <span>Tech.Care</span>
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <a className={item === 'Patients' ? 'nav-link nav-link--active' : 'nav-link'} href={`#${item.toLowerCase()}`} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <div className="doctor-account">
        <img src="https://fedskillstest.ct.digital/1.png" alt="Dr. Jose Simmons" />
        <div>
          <strong>Dr. Jose Simmons</strong>
          <span>General Practitioner</span>
        </div>
        <button type="button" className="icon-button" aria-label="Settings">
          <Settings size={19} />
        </button>
        <button type="button" className="icon-button" aria-label="More options">
          <MoreHorizontal size={21} />
        </button>
      </div>
    </header>
  );
}

export default Header;
