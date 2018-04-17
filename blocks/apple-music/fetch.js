import token from './token';
import { storefront } from './settings';

// Base URL for the apple music API
const baseURL = 'https://api.music.apple.com/v1';

/**
 * Performs a generic request against the specified endpoint of the Apple Music API.
 * @param {string} endpoint - The endpoint to query.
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
    .catch((error) => error.status);
}

export default function getRequest(term, types, limit = 25) {
  const catalogURL = `${baseURL}/catalog/${storefront}/search`;
  const query = `term=${term}&limit=${limit}&types=${types}`;

  return request(`${catalogURL}?${query}`);
}
