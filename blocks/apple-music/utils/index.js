import musicTypes from 'Config/musicTypes';
import embedTypes from 'Config/embedTypes';

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
    (undefined !== styles) ? acc.concat(styles) : acc.concat()), [])
    // Reduce all the available styles by selected style and apply fallback.
    .reduce((acc, { value, imagePath }) => (
      (value === styleValue) ? imagePath : acc.concat()), '');
}

/**
 * Get the icon CSS style properties for inline styles.
 *
 * @param {string} type The type of embedType to look for.
 * @param {string} style the embed type style. Defaults to empty.
 * @returns {string} the inline styles for an embedType.
 */
export function getIconStyle(type, style = '') {
  const st = embedTypes.reduce((acc, {
    backgroundImage,
    height,
    styles,
    value,
    width,
  }) => {
    // Get the embed type.
    if (value === type) {
      let background = backgroundImage;
      // if the embed type has multiple styles grab the matched background image.
      if (undefined !== styles) {
        background = styles.reduce((accum, x) => (
          (style === x.value) ? x.backgroundImage : accum.concat()), '');
      }
      // return our needed values.
      return acc.concat({ background, height, width });
    }
    return acc.concat();
    // since we only need the first item in the array.
  }, []).shift();

  const background = st.background ? `background-image:${st.background};` : '';
  const height = st.height ? `height:${st.height};` : '';
  const width = st.width ? `width:${st.width};` : '';

  return st ? `${height} ${width} ${background}` : '';
}

export default {
  getIconImagePath,
  getIconStyle,
  getObjKeyValue,
  getTypeObject,
  showEmbed,
  getNestedObject,
};
