import musicTypes from './config/musicTypes';

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
  return musicTypes.find((x) => (
    x.value === type
  ));
}

export default {
  getObjKeyValue,
  getTypeObject,
};
