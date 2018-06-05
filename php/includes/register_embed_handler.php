<?php
/**  
 * Register an embed handler for Apple Music iframe embeds.
 */
namespace Apple_Music;

wp_embed_register_handler(
    'apple-music',
    '/http(?:s)?\:\/\/(?:itunes|embed\.music)\.apple\.com\/([a-z]{2})\/(album|playlist|song|station)\/(?:[^\/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9\-]+)(?:\?(width|height)=(\d+)&(width|height)=(\d+))?(?:\?i=(\d+)$)?/i',
    function( $matches, $attr, $url, $rawattr ) {
        if ( empty( $matches ) ) {
            return;
        }

        if ( ! is_admin() ) {
            d($matches); 
        }

        $height = '450px';
        $width  = '650px';

        if ( 'song' === $matches[2] ) {
            $height = '150px';
        }

        $src = sprintf( 'https://embed.music.apple.com/%1$s/%2$s/%3$s',
            $matches[1], // Storefront
            $matches[2], // type
            $matches[3]  // ID
        );
        
        return sprintf(
            '<iframe frameborder="0" allow="autoplay; encrypted-media" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="padding:0;width:%1$s;height:%2$s;max-width:100%;border:none;overflow:hidden;background:transparent;" src="%3$s"></iframe>',
            esc_attr( $width ),
            esc_attr( $height ),
            esc_url( $src )
        );
}, 10, 4 );
