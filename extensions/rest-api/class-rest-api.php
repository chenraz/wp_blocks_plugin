<?php
/**
 * Rest Api
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Rest_Api')) :
    
//     include_once ('class-block-parser.php');
    
    
    final class Rest_Api  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;    
        
        /**
         * 
         */
        public function __construct ()
        {
            self::add_actions();
        }
        
        public static function add_actions () 
        {
            add_action('rest_api_init', [__CLASS__,'add_post_fields'],1000);
            add_action( 'rest_api_init', [__CLASS__,'blocks_rest_route'] );               
        }
        
        public static function add_post_fields ()
        {
            if ( ! function_exists( 'use_block_editor_for_post_type' ) ) {
                require ABSPATH . 'wp-admin/includes/post.php';
            }	
            
            // Surface all Gutenberg blocks in the WordPress REST API
            $post_types = get_post_types_by_support( [ 'editor' ] );
            foreach ( $post_types as $post_type ) {
                if ( use_block_editor_for_post_type( $post_type ) ) {
                    
                    // blocks field
                    register_rest_field( $post_type, 'blocks', [
                        'get_callback' => [__CLASS__,'render_blocks']
                    ] );
                    
                    // thumbnail url
                    register_rest_field( $post_type, 'thumbnail', [
                        'get_callback' => [__CLASS__,'render_thumbnail']
                    ] );   
                    
                    register_rest_field( $post_type, 'excerpt_raw', [
                        'get_callback' => [__CLASS__,'render_excerpt_raw']
                    ] );                       
                }
            }              
        }
        
        /**
         * 
         * @param array $post
         * @return type
         */
        public static function render_blocks (array $post)
        {
            return parse_blocks( $post['content']['raw'] );
            
        }
        
        /**
         * 
         * @param array $post
         * @return type
         */
        public static function render_thumbnail (array $post)
        {
            
//            error_log ('render_thumbnail : ' . print_r($post,true));
            
            $media_id       =   $post['featured_media'] ?? false;
            
            if (! $media_id) {
                return [];
            }
            
            return [
                'url'       =>  get_the_post_thumbnail_url( $post['id'] ),
                'alt'       =>  get_post_meta($media_id, '_wp_attachment_image_alt', true)
            ];
            
        }

        public static function render_excerpt_raw (array $post)
        {
            return isset($post['excerpt'],$post['excerpt']['raw']) 
                    ? $post['excerpt']['raw']
                    :   '';
        }
        
        /**
         * 
         */
        public static function blocks_rest_route ()
        {
            $controller = new Block_Controller();
            $controller->register_routes();            
        }        
    }
    
endif;;