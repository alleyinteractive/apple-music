// Get the apple music settings. Currently only storefront.
export const settings = window.appleMusicBlock;

// Use the storefront settings but default to US store.
export const storefront = undefined !== settings ? settings.storefront : 'us';

export const affiliateToken = undefined !== settings ?
  settings.affiliateToken : '';
