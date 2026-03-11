'use client';
import { useState } from 'react';
export default function Home() {
  const [company, setCompany] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const search = async () => {
    setLoading(true);
    const res = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };
  return (
    <main style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>営業Bot</h1>
      <input
        type="text"
        placeholder="企業名を入力"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={search}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        {loading ? '検索中...' : '検索'}
      </button>
      {result && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          {result}
        </div>
      )}
    </main>
  );
}
