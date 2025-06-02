

async function recommendTechArticles({ keywords }: { keywords: string }) {
  const res = await fetch('/api/recommend-tech-articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keywords }),
  });

  if (!res.ok) throw new Error('API error');
  return res.json();
}