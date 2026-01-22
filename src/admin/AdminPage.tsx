import { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

type Row = {
  id: string;
  created_at: string;
  status: string;

  parent_first_name: string;
  parent_last_name: string;
  parent_email: string;
  parent_phone: string | null;

  child_first_name: string;
  child_last_name: string;
  child_dob: string;

  municipality_name_fi: string | null;
  school_name_fi: string | null;
  club_name_fi: string | null;

  capacity: number | null;
  accepted_count: number | null;
};

export default function AdminPage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('v_rf_registrations_admin')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    setRows((data as Row[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const mail = data.session?.user?.email ?? null;
      setSessionEmail(mail);
      if (mail) load();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const mail = session?.user?.email ?? null;
      setSessionEmail(mail);
      if (mail) load();
      else setRows([]);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function action(regId: string, act: 'accept' | 'waitlist' | 'cancel') {
    const { data, error } = await supabase.rpc('rf_set_registration_status', {
      p_registration_id: regId,
      p_action: act,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // optional: show what happened (accept may become waitlisted)
    if (data?.[0]?.status) {
      alert(`Updated: ${data[0].status}`);
    }

    load();
  }

  if (!sessionEmail) {
    return (
      <div style={{ maxWidth: 420, margin: '40px auto' }}>
        <h2>Coordinator Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 12 }}
        />

        <button onClick={signIn}>Login</button>

        <p style={{ opacity: 0.7, marginTop: 12 }}>
          (Only users in <code>rf_admins</code> can see approvals.)
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 980, margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Registrations (Admin)</h2>
        <div>
          <span style={{ marginRight: 12 }}>{sessionEmail}</span>
          <button onClick={signOut}>Logout</button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={load} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {rows.map(r => (
          <div key={r.id} style={{ border: '1px solid #444', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <b>{r.child_first_name} {r.child_last_name}</b>
                <div style={{ opacity: 0.8 }}>
                  {r.municipality_name_fi} · {r.school_name_fi} · {r.club_name_fi}
                </div>
                <div style={{ opacity: 0.8 }}>
                  Parent: {r.parent_first_name} {r.parent_last_name} ({r.parent_email})
                </div>
                <div style={{ opacity: 0.8 }}>
                  Status: <b>{r.status}</b> · Accepted: {r.accepted_count ?? 0}/{r.capacity ?? '-'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => action(r.id, 'accept')}>Accept</button>
                <button onClick={() => action(r.id, 'waitlist')}>Waitlist</button>
                <button onClick={() => action(r.id, 'cancel')}>Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
