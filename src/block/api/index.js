import {
  getObjKeyValue,
  getTypeObject,
} from 'Utils';
import { storefront } from '../settings';

// Base URL for the apple music API
export const baseURL = 'https://union.staging.organicfruitapps.com/wp';

/**
 * Performs a generic request against the specified endpoint of the Apple Music API.
 *
 * @param {string} endpoint The endpoint to query.
 * @param {string} method The request method.
 * @returns {Promise} A promise that will resolve with the JSON response.
 */
export function request(endpoint, method) {
  return fetch(endpoint, {
    method,
  })
    .then((res) => res.json())
    .catch((error) => error.status);
}

/**
 * Make an endpoint request using the GET method.
 * @param {string} endpoint the endpoint to GET.
 * @returns Promise
 */
export function get(endpoint) {
  return request(endpoint, 'GET');
}

/**
 * Search the Apple Music using the requested term and music type catalog.
 * @see https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/Searchforresources.html
 *
 * @param {string} term The entered text to search the API with.
 * @param {string} types The types query parameter.
 * @param {int} limit The limit on the number of objects that are returned.
 * @param {int} offset The number of items to offset the request.
 * @returns Promise
 */
export function searchCatalog(term, types, limit = 24, offset = '') {
  if (! term) {
    return Promise.resolve('No Search Term');
  }
  const offsetParam = offset ? `&offset=${offset}` : '';
  const catalogURL = `${baseURL}/v1/catalog/${storefront}/search`;
  const query = `term=${term}&limit=${limit}&types=${types}${offsetParam}`;

  return get(`${catalogURL}?${query}`);
}

/**
 * Get the music item object.
 *
 * @param {object} response the music item object
 * @returns {array} The music item from the API response.
 */
export function getItems(response) {
  return response.data || [];
}

/**
 * Set the API embed URL.
 * @param {string} type the music type to embed.
 * @param {string} id the Apple Music ID.
 * @returns {string} the iframe URL.
 */
export function setEmbedURL(type, id) {
  const embedURL = 'https://embed.music.apple.com/';
  const typeObject = getTypeObject(type);

  const embedType = getObjKeyValue(typeObject, 'embedType');

  if (null !== embedType) {
    return `${embedURL}${storefront}/${embedType}/${id}`;
  }
  return '';
}
