import { useState } from 'react';
import Step1Activity from './steps/Step1Activity';
import Step2Basics from './steps/Step2Basics';
import Step3Additional from './steps/Step3Additional';
import Step4Summary from './steps/Step4Summary';
import StepIndicator from './components/StepIndicator';
import AdminPage from './admin/AdminPage';
import { useLang } from './i18n/LanguageContext';
import type { RegistrationDraft } from './types/registration';
import Card from './components/Card';

export default function App() {
  const { lang, toggle } = useLang();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [draft, setDraft] = useState<RegistrationDraft>({});

  const isAdmin =
    new URLSearchParams(window.location.search).get('admin') === '1';
  if (isAdmin) return <AdminPage />;

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-topbar__spacer" />
        <button className="lang-toggle" onClick={toggle} type="button">
          {lang === 'fi' ? 'EN' : 'FI'}
        </button>
      </header>

      <main className="app-main">
        <StepIndicator step={step} />

        {step === 1 && (
          <Card>
            <Step1Activity
              data={draft}
              onChange={setDraft}
              onNext={() => setStep(2)}
            />
          </Card>
        )}

        {step === 2 && (
          <Card>
            <Step2Basics
              data={draft}
              onChange={setDraft}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          </Card>
        )}

        {step === 3 && (
          <Card>
            <Step3Additional
              data={draft}
              onChange={setDraft}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          </Card>
        )}

        {step === 4 && (
          <Card>
            <Step4Summary
              data={draft}
              onBack={() => setStep(3)}
              onSuccess={() => setStep(5)}
            />
          </Card>
        )}

        {step === 5 && (
          <Card>
            <div>
              <h2>Ilmoittautuminen onnistui 🎉</h2>
              <p>
                Kiitos! Ilmoittautuminen on vastaanotettu ja odottaa
                koordinaattorin hyväksyntää.
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
