const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

function authHeader() {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: token } : {};
}

function handleResponse(response) {
  return response.json().then(json => {
    if (json.status !== 1) {
      throw new Error(json.error?.message || json.message || 'API error');
    }
    return json.data;
  });
}

function cleanParams(rawParams = {}) {
  return Object.entries(rawParams)
    .filter(([, v]) => v != null && v !== '')
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export const moviesService = {
  listRaw: async rawParams => {
    const params = cleanParams(rawParams);
    const qs = new URLSearchParams(params);
    const url = `${API_URL}/movies${qs.toString() ? `?${qs}` : ''}`;
    const response = await fetch(url, { headers: authHeader() });
    const json = await response.json();
    if (json.status !== 1) {
      throw new Error(json.error?.message || json.message || 'API error');
    }
    return {
      data: json.data,
      meta: json.meta,
    };
  },

  list: rawParams => {
    const params = cleanParams(rawParams);
    const qs = new URLSearchParams(params);
    const url = `${API_URL}/movies${qs.toString() ? `?${qs}` : ''}`;
    return fetch(url, { headers: authHeader() }).then(handleResponse);
  },

  getById: id =>
    fetch(`${API_URL}/movies/${id}`, { headers: authHeader() }).then(handleResponse),

  add: movie =>
    fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(movie),
    }).then(handleResponse),

  remove: id =>
    fetch(`${API_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: authHeader(),
    }).then(handleResponse),

  import: file => {
    const form = new FormData();
    form.append('movies', file);
    return fetch(`${API_URL}/movies/import`, {
      method: 'POST',
      headers: authHeader(),
      body: form,
    }).then(handleResponse);
  },
};