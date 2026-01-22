import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { supabase } from '../api/supabase';
import { useLang } from '../i18n/LanguageContext';
import { card, select, label } from '../components/ui';


type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
};

export default function Step1Activity({ data, onChange, onNext }: Props) {
  const { lang } = useLang();

  const labels = useMemo(() => {
    return lang === 'fi'
      ? {
          title: 'Harrastus',
          municipalityLabel: 'Kunta, jossa lapsesi käy koulua',
          municipalityPlaceholder: 'Valitse kunta',
          schoolLabel: 'Valitse koulu',
          schoolPlaceholder: 'Valitse koulu',
          clubLabel: 'Valitse harrastus',
          clubPlaceholder: 'Valitse harrastus',
          opensAtPrefix: 'Ilmoittautuminen avautuu',
          next: 'Seuraava',
        }
      : {
          title: 'Activity',
          municipalityLabel: 'Municipality where your child attends school',
          municipalityPlaceholder: 'Select municipality',
          schoolLabel: 'Select school',
          schoolPlaceholder: 'Select school',
          clubLabel: 'Select activity',
          clubPlaceholder: 'Select activity',
          opensAtPrefix: 'Registration opens',
          next: 'Next',
        };
  }, [lang]);

  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [opensAt, setOpensAt] = useState<string | null>(null);

  // Load municipalities
  useEffect(() => {
    supabase
      .from('rf_municipalities')
      .select('*')
      .order('name_fi')
      .then(res => {
        setMunicipalities(res.data || []);
      });
  }, []);

  // When municipality changes
  useEffect(() => {
    if (!data.municipalityId) {
      setOpensAt(null);
      setSchools([]);
      setClubs([]);
      return;
    }

    // get opening time
    supabase
      .from('rf_municipalities')
      .select('registration_opens_at')
      .eq('id', data.municipalityId)
      .single()
      .then(res => setOpensAt(res.data?.registration_opens_at || null));

    // load schools
    supabase
      .from('rf_schools')
      .select('*')
      .eq('municipality_id', data.municipalityId)
      .order('name_fi')
      .then(res => setSchools(res.data || []));

    // reset downstream UI list
    setClubs([]);
  }, [data.municipalityId]);

  // When school changes
  useEffect(() => {
    if (!data.schoolId) {
      setClubs([]);
      return;
    }

    supabase
      .from('rf_clubs')
      .select('*')
      .eq('school_id', data.schoolId)
      .eq('is_active', true)
      .order('name_fi')
      .then(res => setClubs(res.data || []));
  }, [data.schoolId]);

  const registrationOpen = opensAt ? dayjs().isAfter(dayjs(opensAt)) : false;

  return (
    <div style={card}>
      <h2>{labels.title}</h2>

      {/* Municipality */}
      <label style={label}>{labels.municipalityLabel}</label>
      <select
        style={select}
        value={data.municipalityId || ''}
        onChange={e =>
          onChange({
            ...data,
            municipalityId: e.target.value || undefined,
            schoolId: undefined,
            clubId: undefined,
          })
        }
      >
        <option value="">{labels.municipalityPlaceholder}</option>
        {municipalities.map(m => (
          <option key={m.id} value={m.id}>
            {lang === 'fi' ? m.name_fi : m.name_en}
          </option>
        ))}
      </select>

      {/* Opening time info */}
      {opensAt && !registrationOpen && (
        <p style={{ color: 'red', marginTop: 8 }}>
          {labels.opensAtPrefix}{' '}
          {dayjs(opensAt).format('DD.MM.YYYY HH:mm')}
        </p>
      )}

      {/* School */}
      {registrationOpen && (
        <>
          <label style={{ marginTop: 16, display: 'block' }}>
            {labels.schoolLabel}
          </label>
          <select
            style={select}
            value={data.schoolId || ''}
            onChange={e =>
              onChange({
                ...data,
                schoolId: e.target.value || undefined,
                clubId: undefined,
              })
            }
          >
            <option value="">{labels.schoolPlaceholder}</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>
                {lang === 'fi' ? s.name_fi : s.name_en}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Club */}
      {data.schoolId && registrationOpen && (
        <>
          <label style={{ marginTop: 16, display: 'block' }}>
            {labels.clubLabel}
          </label>
          <select
            style={select}
            value={data.clubId || ''}
            onChange={e =>
              onChange({
                ...data,
                clubId: e.target.value || undefined,
              })
            }
          >
            <option value="">{labels.clubPlaceholder}</option>
            {clubs.map(c => (
              <option key={c.id} value={c.id}>
                {lang === 'fi' ? c.name_fi : c.name_en}
              </option>
            ))}
          </select>
        </>
      )}

      <div style={{ marginTop: 24 }}>
        <button className='btn-primary' disabled={!data.clubId} onClick={onNext}>
          {labels.next}
        </button>
      </div>

    </div>    
  );
}
