import token from './token';
import {
  getObjKeyValue,
  getTypeObject,
} from './utils';
import { storefront } from './settings';

// Base URL for the apple music API
const baseURL = 'https://api.music.apple.com/v1';

/**
 * Performs a generic request against the specified endpoint of the Apple Music API.
 *
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

/**
 * Search the Apple Music using the requested term and music type catalog.
 * @see https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/Searchforresources.html
 *
 * @param {string} term The entered text to search the API with.
 * @param {string} types The types query parameter.
 * @param {int} limit The limit on the number of objects that are returned.
 */
export function searchCatalog(term, types, limit = 25) {
  if (! term) {
    return new Promise((resolve) => setTimeout(resolve, 100, 'No Search Term'));
  }
  const catalogURL = `${baseURL}/catalog/${storefront}/search`;
  const query = `term=${term}&limit=${limit}&types=${types}`;

  return request(`${catalogURL}?${query}`);
}

/**
 * Check the data response according to search type and return data.
 *
 * @param {object} data The fetched data to check for.
 * @param {string} type The music type to check for.
 * @returns {array} empty array or an array of objects.
 */
export function getResponseData(data, type) {
  if (data.results) {
    const result = Object.prototype
      .hasOwnProperty.call(data.results, type);
    return result ? data.results[type] : [];
  }
  return [];
}

/**
 * Get the music item object.
 *
 * @param {object} response the music item object
 */
export function getItems(response) {
  if (! response.data) {
    return [];
  }
  return response.data;
}

/**
 * Get the API iframe URL for embedding.
 * @param {string} type the music type to embed.
 * @param {string} id the Apple Music ID.
 */
export function iframeURL(type, id) {
  const baseUrl = 'https://tools.applemusic.com/embed/v1/';
  const typeObject = getTypeObject(type);

  const embedType = getObjKeyValue(typeObject, 'embedType');

  if (null !== embedType) {
    return `${baseUrl}${embedType}/${id}?country=${storefront}`;
  }
  return '';
}
