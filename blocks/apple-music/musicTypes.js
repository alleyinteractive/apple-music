// Import internationalization function.
const { __ } = window.wp.i18n;
/**
 * The list of the types of resources to include in the results. The possible values are activities, artists, apple-curators, albums, curators, songs, playlists, music-videos, and stations.
 *
 * @see  https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/Searchforresources.html#//apple_ref/doc/uid/TP40017625-CH58-SW1
 * @type {Array} music type values and labels
 */
const musicTypes = [
  {
    value: 'artists', label: __('Artists', 'apple-music'),
  },
  {
    value: 'songs', label: __('Songs', 'apple-music'),
  },
  {
    value: 'albums', label: __('Albums', 'apple-music'),
  },
  {
    value: 'playlists', label: __('Playlists', 'apple-music'),
  },
  {
    value: 'activities', label: __('Activities', 'apple-music'),
  },
  {
    value: 'curators', label: __('Curators', 'apple-music'),
  },
  {
    value: 'apple-curators', label: __('Apple Curators', 'apple-music'),
  },
  {
    value: 'stations', label: __('Stations', 'apple-music'),
  },
  {
    value: 'music-videos', label: __('Music Videos', 'apple-music'),
  },
];

export default musicTypes;
