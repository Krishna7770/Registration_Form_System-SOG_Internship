import { useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { card, input, select } from '../components/ui';


type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Step3Additional({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const { lang } = useLang();

  const labels = useMemo(() => {
    return lang === 'fi'
      ? {
          title: 'Lisätiedot',
          gender: 'Lapsen sukupuoli',
          info: 'Muuta tietoa',
          back: 'Takaisin',
          next: 'Seuraava',
        }
      : {
          title: 'Additional information',
          gender: 'Child gender',
          info: 'Additional notes',
          back: 'Back',
          next: 'Next',
        };
  }, [lang]);

  return (
    <div style={card}>
      <h2>{labels.title}</h2>

      <label>{labels.gender}</label>
      <select
        style={select}
        value={data.childGender || ''}
        onChange={e => onChange({ ...data, childGender: e.target.value })}
      >
        <option value="">{lang === 'fi' ? 'Ei valittu' : 'Not selected'}</option>
        <option value="female">{lang === 'fi' ? 'Tyttö' : 'Female'}</option>
        <option value="male">{lang === 'fi' ? 'Poika' : 'Male'}</option>
        <option value="other">{lang === 'fi' ? 'Muu' : 'Other'}</option>
      </select>

      <label style={{ marginTop: 16, display: 'block' }}>
        {labels.info}
      </label>
      <textarea
        style={input}
        rows={4}
        value={data.additionalInfo || ''}
        onChange={e => onChange({ ...data, additionalInfo: e.target.value })}
      />

      <div style={{ marginTop: 24 }}>
        <button className='btn-secondary' onClick={onBack}>{labels.back}</button>
        <button className='btn-primary' onClick={onNext} style={{ marginLeft: 8 }}>
          {labels.next}
        </button>
      </div>
    </div>
  );
}
