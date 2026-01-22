// components/Card.tsx
export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#d1784cd6',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 0 0 1px #222, 0 20px 40px rgba(0,0,0,0.5)',
      }}
    >
      {children}
    </div>
  );
}
