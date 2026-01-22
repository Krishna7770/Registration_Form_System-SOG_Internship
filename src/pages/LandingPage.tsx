import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import './LandingPage.css';

import heroImg from '../assets/Webflow_tuotehero.png';
import sogLogo from '../assets/sog_logo.svg';

export default function LandingPage() {
  const navigate = useNavigate();
  const { lang, toggle } = useLang();

  const t = {
    title:
      lang === 'fi'
        ? 'School of Gaming -kerhot'
        : 'School of Gaming Clubs',
    subtitle:
      lang === 'fi'
        ? 'Ohjatut koulupohjaiset pelikerhot, joissa pelaaminen tukee oppimista.'
        : 'Guided school-based gaming clubs where play supports learning.',
    register: lang === 'fi' ? 'Ilmoittaudu kerhoihin' : 'Register for clubs',
    admin: lang === 'fi' ? 'Ylläpito' : 'Admin',
    why: lang === 'fi' ? 'Miksi School of Gaming?' : 'Why School of Gaming?',
  };

  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <img src={sogLogo} alt="School of Gaming" />
        <div className="header-actions">
          <button className="landing-btn-small" onClick={toggle}>
            {lang === 'fi' ? 'EN' : 'FI'}
          </button>
          <button
            className="landing-btn-small"
            onClick={() => navigate('/register?admin=1')}
          >
            {t.admin}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>

          <div className="hero-buttons">
            <button
              className="landing-btn-primary"
              onClick={() => navigate('/register')}
            >
              {t.register}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="landing-content">
        <h2>{t.why}</h2>

        <div className="features">
          <div className="landing-feature-card">
            🎮 <strong>Learning through play</strong>
            <br />
            Structured gaming that develops teamwork and problem-solving.
          </div>
          <div className="landing-feature-card">
            🧑‍🏫 <strong>Trained instructors</strong>
            <br />
            Educators who understand both children and games.
          </div>
          <div className="landing-feature-card">
            🧠 <strong>Healthy digital habits</strong>
            <br />
            Balanced approach to screen time and wellbeing.
          </div>
          <div className="landing-feature-card">
            🏫 <strong>School-based safety</strong>
            <br />
            Clubs run in cooperation with schools.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        © School of Gaming
      </footer>
    </div>
  );
}
