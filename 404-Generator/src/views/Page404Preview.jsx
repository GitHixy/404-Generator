import React from 'react';

export default function Page404Preview({ data }) {
  const { colors, emoji, message } = data;
  return (
    <div style={{
      background: colors.background,
      color: colors.text,
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{emoji}</div>
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{message}</div>
      <div style={{ color: colors.accent, fontWeight: 'bold', fontSize: '2rem' }}>404</div>
    </div>
  );
}
