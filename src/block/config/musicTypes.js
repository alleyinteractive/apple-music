// Import internationalization function.
import { __ } from '@wordpress/i18n';
import '../i18n';
/**
 * The list of the types of resources to include in the results.
 * The possible values are activities, artists, apple-curators,
 * albums, curators, songs, playlists, music-videos, and stations.
 *
 * "value" - the slugified name of the music type.
 * "label" - The front end label for each music type.
 * "embedHeight" - used to determine the initial height of the iframe.
 * "embedType" - refers to the singlular name used in the API call.
 * "embed" - a boolean value indicating whether this type has an available embed.
 *
 * @see  https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/AppleMusicWebServicesReference/Searchforresources.html#//apple_ref/doc/uid/TP40017625-CH58-SW1
 * @type {Array} music type values and labels
 */
const musicTypes = [
  {
    value: 'artists',
    label: __('Artists', 'connect-to-apple-music'),
    embedType: 'artist',
    embed: false,
  },
  {
    value: 'songs',
    label: __('Songs', 'connect-to-apple-music'),
    embedHeight: '150px',
    embedType: 'song',
    embed: true,
  },
  {
    value: 'albums',
    label: __('Albums', 'connect-to-apple-music'),
    embedHeight: '450px',
    embedType: 'album',
    embed: true,
  },
  {
    value: 'playlists',
    label: __('Playlists', 'connect-to-apple-music'),
    embedHeight: '450px',
    embedType: 'playlist',
    embed: true,
  },
  {
    value: 'activities',
    label: __('Activities', 'connect-to-apple-music'),
    embedType: 'curator',
    embed: false,
  },
  {
    value: 'curators',
    label: __('Curators', 'connect-to-apple-music'),
    embedType: 'curator',
    embed: false,
  },
  {
    value: 'stations',
    label: __('Radio', 'connect-to-apple-music'),
    embedType: 'station',
    embed: false,
  },
  {
    value: 'music-videos',
    label: __('Music Videos', 'connect-to-apple-music'),
    embedType: 'music-video',
    embed: false,
  },
];

export default musicTypes;
