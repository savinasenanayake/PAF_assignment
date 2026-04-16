const CATEGORY_THEME = {
  workshop: { from: '#0f766e', to: '#14b8a6', icon: 'Workshop' },
  seminar: { from: '#1d4ed8', to: '#60a5fa', icon: 'Seminar' },
  sports: { from: '#b45309', to: '#f59e0b', icon: 'Sports' },
  music: { from: '#be123c', to: '#fb7185', icon: 'Music' },
  cultural: { from: '#7c3aed', to: '#a78bfa', icon: 'Cultural' },
  tech: { from: '#0f172a', to: '#334155', icon: 'Tech' },
  conference: { from: '#374151', to: '#6b7280', icon: 'Conference' },
};

const DEFAULT_THEME = { from: '#1e3a8a', to: '#2563eb', icon: 'Campus Event' };

const getTheme = (category) => {
  const key = (category || '').trim().toLowerCase();
  return CATEGORY_THEME[key] || DEFAULT_THEME;
};

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildSvgDataUri = (event) => {
  const theme = getTheme(event?.category);
  const title = (event?.title || 'Event').trim().slice(0, 38);
  const label = (event?.category || theme.icon).trim().slice(0, 20);
  const safeTitle = escapeXml(title);
  const safeLabel = escapeXml(label);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.from}"/>
      <stop offset="100%" stop-color="${theme.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="160" fill="rgba(255,255,255,0.16)"/>
  <circle cx="170" cy="620" r="210" fill="rgba(255,255,255,0.12)"/>
  <rect x="72" y="82" width="320" height="48" rx="24" fill="rgba(255,255,255,0.24)"/>
  <text x="232" y="114" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="white">${safeLabel}</text>
  <text x="72" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="800" fill="white">${safeTitle}</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const getEventImage = (event) => {
  if (event?.imageUrl && event.imageUrl.trim()) {
    return event.imageUrl;
  }
  return buildSvgDataUri(event);
};

export const getSafeFallbackImage = (event) => {
  return buildSvgDataUri(event);
};