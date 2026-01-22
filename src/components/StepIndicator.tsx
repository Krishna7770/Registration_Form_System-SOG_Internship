type Props = {
  step: number;
};

const steps = [
  { id: 1, labelFi: 'Harrastus', labelEn: 'Activity' },
  { id: 2, labelFi: 'Perustiedot', labelEn: 'Basics' },
  { id: 3, labelFi: 'Lisätiedot', labelEn: 'Additional' },
  { id: 4, labelFi: 'Yhteenveto', labelEn: 'Summary' },
];

export default function StepIndicator({ step }: Props) {
  return (
    <div style={container}>
      {steps.map((s, index) => {
        const isActive = step === s.id;
        const isDone = step > s.id;

        return (
          <div key={s.id} style={item}>
            <div
              style={{
                ...circle,
                ...(isDone ? done : {}),
                ...(isActive ? active : {}),
              }}
            >
              {s.id}
            </div>

            <span
              style={{
                ...label,
                opacity: isActive || isDone ? 1 : 0.4,
              }}
            >
              {s.labelFi}
            </span>

            {index < steps.length - 1 && (
              <div
                style={{
                  ...line,
                  background: isDone ? '#00ffcc' : '#333',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- styles ---------- */

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 32,
};

const item: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const circle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: '#1b1b1b',
  border: '2px solid #333',
  color: '#aaa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
};

const active: React.CSSProperties = {
  background: '#fcde31',
  color: '#000',
  boxShadow: '0 0 12px rgba(38, 207, 103, 0.8)',
};

const done: React.CSSProperties = {
  background: '#00cc88',
  color: '#000',
};

const label: React.CSSProperties = {
  fontSize: 14,
  whiteSpace: 'nowrap',
};

const line: React.CSSProperties = {
  width: 40,
  height: 2,
};
