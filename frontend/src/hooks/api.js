const normalizeBaseUrl = (url) => {
  if (!url) return '';
  return url.trim().replace(/\/+$/, '');
};

const getDefaultBase = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5173';
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

const API_BASE_URL = (() => {
  const configured = normalizeBaseUrl(import.meta.env.VITE_API_URL);
  if (configured) {
    return configured;
  }
  return normalizeBaseUrl(getDefaultBase());
})();

export const buildApiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE_URL) {
    return normalizedPath;
  }
  return `${API_BASE_URL}${normalizedPath}`;
};
