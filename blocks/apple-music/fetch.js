import token from './token';

/**
 * Performs a generic request against the specified endpoint of the Apple Music API.
 * @param {string} endpoint - The endpoint to query.
 * @param {object} options - Options for the request, including method.
 * @returns {Promise} - A promise that will resolve with the JSON response.
 */
export function request(endpoint) {
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Host: 'api.music.apple.com',
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-transform, max-age=900',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => error);
}

export default function search(term, types, limit = 25) {
  const baseURL = 'https://api.music.apple.com/v1/catalog/us/search';
  const query = `term=${term}&limit=${limit}&types=${types}`;

  return request(`${baseURL}?${query}`);
}
