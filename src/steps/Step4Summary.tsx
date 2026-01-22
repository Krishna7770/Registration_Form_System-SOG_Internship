import { useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { supabase } from '../api/supabase';
import { card } from '../components/ui';

type Props = {
  data: any;
  onBack: () => void;
  onSuccess: () => void;
};

export default function Step4Summary({ data, onBack, onSuccess }: Props) {
  const { lang } = useLang();

  const labels = useMemo(() => {
    return lang === 'fi'
      ? {
          title: 'Yhteenveto',
          parent: 'Vanhempi',
          child: 'Lapsi',
          additional: 'Lisätiedot',
          register: 'Rekisteröidy',
          back: 'Takaisin',
        }
      : {
          title: 'Summary',
          parent: 'Parent',
          child: 'Child',
          additional: 'Additional information',
          register: 'Register',
          back: 'Back',
        };
  }, [lang]);

  async function submit() {
    const { error } = await supabase.from('rf_registrations').insert({
      municipality_id: data.municipalityId,
      school_id: data.schoolId,
      club_id: data.clubId,
      parent_first_name: data.parentFirstName,
      parent_last_name: data.parentLastName,
      parent_email: data.parentEmail,
      parent_phone: data.parentPhone || null,
      child_first_name: data.childFirstName,
      child_last_name: data.childLastName,
      child_dob: data.childDob,
      child_gender: data.childGender || null,
      additional_info: data.additionalInfo || null,
      consent: data.consent,
    });

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
  }

  return (
    <div style={card}>
      <h2>{labels.title}</h2>

      <h3>{labels.parent}</h3>
      <p>
        {data.parentFirstName} {data.parentLastName}
        <br />
        {data.parentEmail}
      </p>

      <h3>{labels.child}</h3>
      <p>
        {data.childFirstName} {data.childLastName}
        <br />
        {data.childDob}
      </p>

      <h3>{labels.additional}</h3>
      <p>{data.additionalInfo || '—'}</p>

      <div style={{ marginTop: 24 }}>
        <button className='btn-secondary' onClick={onBack}>{labels.back}</button>
        <button className='btn-primary' onClick={submit} style={{ marginLeft: 8 }}>
          {labels.register}
        </button>
      </div>
    </div>
  );
}
