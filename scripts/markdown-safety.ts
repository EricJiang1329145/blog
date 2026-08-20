export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeXml(value: string): string {
  return escapeHtml(value).replace(/&#39;/g, '&apos;');
}

export function safeUrl(value: string, allowMailto = false): string {
  const url = value.trim();
  if (/^(https?:)/i.test(url)) return url;
  if (allowMailto && /^mailto:/i.test(url)) return url;
  if (/^(\/|\.\/|\.\.\/|#)/.test(url)) return url;
  return '#';
}
