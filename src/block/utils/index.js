import musicTypes from 'Config/musicTypes';
import embedTypes from 'Config/embedTypes';
import { affiliateToken } from '../settings';

/**
 * Get an objects key value.
 * @param {object} obj The Object to look for.
 * @param {object} key The key to return the associated value.
 */
export function getObjKeyValue(obj, key) {
  if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
  return null;
}

/**
 * Get the music Type object from the Music Type object.
 * @param {type} type the musicType object
 */
export function getTypeObject(type) {
  return musicTypes.find((x) => x.value === type);
}

/**
 * Check to see if this music type has an embeddable iframe.
 * @param {string} type The music type to check for.
 */
export function showEmbed(type) {
  const musicType = getTypeObject(type);
  return getObjKeyValue(musicType, 'embed');
}

/**
 * Pass in your object structure as array elements.
 *
 * getNestedObject(obj, [level-1-key, level-2-key]);
 * @param {object} nestedObj the object to retrieve the key value.
 * @param {array} pathArr the array of nested keys to search.
 * @return mixed
 */
export function getNestedObject(nestedObj, pathArr) {
  return pathArr.reduce((obj, key) =>
    ((obj && 'undefined' !== obj[key]) ? obj[key] : undefined), nestedObj);
}

/**
 * Get the artwork URL for a music item.
 * @see https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/Artwork.html#//apple_ref/doc/uid/TP40017625-CH26-SW1
 * @param {object} item the music item object.
 * @param {string} width the width of the image.
 * @param {string} height the height of the image.
 * @returns {string} the URL path to the artwork image.
 */
export function getItemArtworkURL(item, width = '118', height = '118') {
  const imageSrc = getNestedObject(item, ['attributes', 'artwork', 'url']);
  return imageSrc ? imageSrc.replace('{w}', width)
    .replace('{h}', height).replace('{c}', 'sr') : null;
}

/**
 * Get the image path for a embedType that has multiple icon styles.
 *
 * @param {string} styleValue value of the icon style found in embedTypes styles object.
 * @returns {string} string - the image path or an empty string.
 */
export function getIconImagePath(styleValue) {
  return embedTypes.reduce((acc, { styles }) => (
    (undefined !== styles) ? acc.concat(styles) : acc), [])
    // Reduce all the available styles by selected style and apply fallback.
    .reduce((acc, { value, imagePath }) => (
      (value === styleValue) ? imagePath : acc), '');
}

/**
 * Get the icon image attributes for the embedded icon image.
 *
 * Each param is a block attribute.
 *
 * @param {string} embedType The embed type.
 * @param {string} style The icon style. Either appIconStyle or textLockUpStyle.
 * @returns {object} the image attributes set in the embedTypes.js config file.
 */
export function getImageAttributes(embedType, style = '') {
  return embedTypes.reduce((acc, {
    height,
    imageSource,
    styles,
    value,
    width,
  }) => {
    // Get the embed type.
    if (value === embedType) {
      let src = imageSource;
      // if the embed embedType has multiple styles grab the matched background image.
      if (undefined !== styles) {
        src = styles.reduce((accum, x) => (
          // Set the background or fallback to the default.
          (style === x.value || x.default) ?
            x.imageSource : accum.concat()), '');
      }
      // return the image attributes in an object
      return acc.concat({ src, width, height });
    }
    return acc;
    // since we only need the first item in the array.
  }, []).shift();
}

/**
 * Set up the embed dimensions based on the regex pattern for the embed handler.
 * @param {string} url the URL to pass to the Embed API
 * @param {string} width the width of the iframe.
 * @param {string} height the height of the iframe.
 */
export function setEmbedDimensions(url, width, height) {
  const heightParam = height ? `+height=${height}` : '';
  const widthParam = width ? `width=${width}` : '';
  return url ? url.concat(`?${widthParam}${heightParam}`) : '';
}

/**
 * Apply the affiliate token to a URL.
 * @param {string} link the link to apply the affiliate token to.
 * @returns {string}
 */
export function applyAffiliateToken(link) {
  // if there is a link append the app=music query string
  const url = link ? `${link}?app=music` : link;
  return affiliateToken && link ?
    url.concat(`&at=${affiliateToken}`) : url;
}

/**
 * Capitalize the first letter of a string.
 * @param {string} string
 * @returns {string} the string with the first character capitalized.
 */
export function ucFirst(string) {
  return `${string
    .charAt(0).toUpperCase()}${string.slice(1)}`;
}

export default {
  getIconImagePath,
  getImageAttributes,
  getObjKeyValue,
  getTypeObject,
  showEmbed,
  getNestedObject,
  setEmbedDimensions,
  applyAffiliateToken,
  ucFirst,
};
