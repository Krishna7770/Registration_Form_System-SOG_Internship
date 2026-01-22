import { useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { card, input, sectionTitle } from '../components/ui';


type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Step2Basics({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const { lang } = useLang();

  const labels = useMemo(() => {
    return lang === 'fi'
      ? {
          title: 'Perustiedot',
          parentTitle: 'Vanhemman tiedot',
          childTitle: 'Lapsen tiedot',
          parentFirst: 'Vanhemman etunimi',
          parentLast: 'Vanhemman sukunimi',
          parentEmail: 'Sähköposti',
          parentPhone: 'Puhelinnumero (valinnainen)',
          childFirst: 'Lapsen etunimi',
          childLast: 'Lapsen sukunimi',
          dob: 'Syntymäaika',
          consent: 'Hyväksyn tietojen tallentamisen ja käsittelyn',
          back: 'Takaisin',
          next: 'Seuraava',
        }
      : {
          title: 'Basic information',
          parentTitle: 'Parent information',
          childTitle: 'Child information',
          parentFirst: 'Parent first name',
          parentLast: 'Parent last name',
          parentEmail: 'Email',
          parentPhone: 'Phone (optional)',
          childFirst: 'Child first name',
          childLast: 'Child last name',
          dob: 'Date of birth',
          consent: 'I consent to data storage and processing',
          back: 'Back',
          next: 'Next',
        };
  }, [lang]);

  const canContinue =
    data.parentFirstName &&
    data.parentLastName &&
    data.parentEmail &&
    data.childFirstName &&
    data.childLastName &&
    data.childDob &&
    data.consent === true;

  return (
    <div style={card}>
      <h2>{labels.title}</h2>

      <h3 style={sectionTitle}>{labels.parentTitle}</h3>
      <input
        style={input}
        placeholder={labels.parentFirst}
        value={data.parentFirstName || ''}
        onChange={e => onChange({ ...data, parentFirstName: e.target.value })}
      />
      <input
      style={input}
        placeholder={labels.parentLast}
        value={data.parentLastName || ''}
        onChange={e => onChange({ ...data, parentLastName: e.target.value })}
      />
      <input
      style={input}
        type="email"
        placeholder={labels.parentEmail}
        value={data.parentEmail || ''}
        onChange={e => onChange({ ...data, parentEmail: e.target.value })}
      />
      <input
      style={input}
        placeholder={labels.parentPhone}
        value={data.parentPhone || ''}
        onChange={e => onChange({ ...data, parentPhone: e.target.value })}
      />

      <h3 style={sectionTitle}>{labels.childTitle}</h3>
      <input
      style={input}
        placeholder={labels.childFirst}
        value={data.childFirstName || ''}
        onChange={e => onChange({ ...data, childFirstName: e.target.value })}
      />
      <input
      style={input}
        placeholder={labels.childLast}
        value={data.childLastName || ''}
        onChange={e => onChange({ ...data, childLastName: e.target.value })}
      />
      <input
       style={input}
        type="date"
        value={data.childDob || ''}
        onChange={e => onChange({ ...data, childDob: e.target.value })}
      />

      <label style={{ display: 'block', marginTop: 10 }}>
        <input
          type="checkbox"
          checked={data.consent || false}
          onChange={e => onChange({ ...data, consent: e.target.checked })}
        />{' '} {labels.consent}
      </label>

      <div style={{ marginTop: 24 }}>
        <button className='btn-secondary' onClick={onBack}>{labels.back}</button>
        <button
          className='btn-primary'
          onClick={onNext}
          disabled={!canContinue}
          style={{ marginLeft: 8 }}
        >
          {labels.next}
        </button>
      </div>
    </div>
  );
}
