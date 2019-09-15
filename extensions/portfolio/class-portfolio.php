<?php

/* 
 * Portfolio 
 */

namespace Tilnet\Portfolio;

if (!class_exists('\Tilnet\Portfolio\Portfolio')) :
    
    final class Portfolio  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;    
        
        /**
         * 
         */
        public function __construct ()
        {
            self::add_actions();
        }
        
        /**
         * 
         */
        public static function add_actions () 
        {
            add_action( 'init', [__CLASS__,'register_post_type'] );
            add_action( 'init', [__CLASS__,'register_taxonomy'],20 );
        }
        
        /**
         * 
         */
        public static function register_post_type ()
        {
            register_post_type( 'portfolio', array(
                'labels'                => array(
                    'name'                  => __( 'Portfolios', 'tilnet-blocks' ),
                    'singular_name'         => __( 'Portfolio', 'tilnet-blocks' ),
                    'all_items'             => __( 'All Portfolios', 'tilnet-blocks' ),
                    'archives'              => __( 'Portfolio Archives', 'tilnet-blocks' ),
                    'attributes'            => __( 'Portfolio Attributes', 'tilnet-blocks' ),
                    'insert_into_item'      => __( 'Insert into Portfolio', 'tilnet-blocks' ),
                    'uploaded_to_this_item' => __( 'Uploaded to this Portfolio', 'tilnet-blocks' ),
                    'featured_image'        => _x( 'Featured Image', 'portfolio', 'tilnet-blocks' ),
                    'set_featured_image'    => _x( 'Set featured image', 'portfolio', 'tilnet-blocks' ),
                    'remove_featured_image' => _x( 'Remove featured image', 'portfolio', 'tilnet-blocks' ),
                    'use_featured_image'    => _x( 'Use as featured image', 'portfolio', 'tilnet-blocks' ),
                    'filter_items_list'     => __( 'Filter Portfolios list', 'tilnet-blocks' ),
                    'items_list_navigation' => __( 'Portfolios list navigation', 'tilnet-blocks' ),
                    'items_list'            => __( 'Portfolios list', 'tilnet-blocks' ),
                    'new_item'              => __( 'New Portfolio', 'tilnet-blocks' ),
                    'add_new'               => __( 'Add New', 'tilnet-blocks' ),
                    'add_new_item'          => __( 'Add New Portfolio', 'tilnet-blocks' ),
                    'edit_item'             => __( 'Edit Portfolio', 'tilnet-blocks' ),
                    'view_item'             => __( 'View Portfolio', 'tilnet-blocks' ),
                    'view_items'            => __( 'View Portfolios', 'tilnet-blocks' ),
                    'search_items'          => __( 'Search Portfolios', 'tilnet-blocks' ),
                    'not_found'             => __( 'No Portfolios found', 'tilnet-blocks' ),
                    'not_found_in_trash'    => __( 'No Portfolios found in trash', 'tilnet-blocks' ),
                    'parent_item_colon'     => __( 'Parent Portfolio:', 'tilnet-blocks' ),
                    'menu_name'             => __( 'Portfolios', 'tilnet-blocks' ),
                ),
                'public'                => true,
                'hierarchical'          => false,
                'show_ui'               => true,
                'show_in_nav_menus'     => true,
                'supports'              => array( 'title', 'editor','thumbnail','excerpt' ),
                'has_archive'           => true,
                'rewrite'               => true,
                'query_var'             => true,
                'menu_position'         => null,
                'menu_icon'             => 'dashicons-desktop',
                'show_in_rest'          => true,
                'rest_base'             => 'portfolio',
                'rest_controller_class' => 'WP_REST_Posts_Controller',
            ) );
            
        }
        
        /**
         * 
         */
        public static function register_taxonomy ()
        {
            register_taxonomy( 'til_type', array( 'portfolio' ), array(
                'hierarchical'      => true,
                'public'            => true,
                'show_in_nav_menus' => true,
                'show_ui'           => true,
                'show_admin_column' => false,
                'query_var'         => true,
                'rewrite'           => true,
                'capabilities'      => array(
                    'manage_terms'  => 'edit_posts',
                    'edit_terms'    => 'edit_posts',
                    'delete_terms'  => 'edit_posts',
                    'assign_terms'  => 'edit_posts',
                ),
                'labels'            => array(
                    'name'                       => __( 'Types', 'tilnet-blocks' ),
                    'singular_name'              => _x( 'Type', 'taxonomy general name', 'tilnet-blocks' ),
                    'search_items'               => __( 'Search Types', 'tilnet-blocks' ),
                    'popular_items'              => __( 'Popular Types', 'tilnet-blocks' ),
                    'all_items'                  => __( 'All Types', 'tilnet-blocks' ),
                    'parent_item'                => __( 'Parent Type', 'tilnet-blocks' ),
                    'parent_item_colon'          => __( 'Parent Type:', 'tilnet-blocks' ),
                    'edit_item'                  => __( 'Edit Type', 'tilnet-blocks' ),
                    'update_item'                => __( 'Update Type', 'tilnet-blocks' ),
                    'view_item'                  => __( 'View Type', 'tilnet-blocks' ),
                    'add_new_item'               => __( 'Add New Type', 'tilnet-blocks' ),
                    'new_item_name'              => __( 'New Type', 'tilnet-blocks' ),
                    'separate_items_with_commas' => __( 'Separate Types with commas', 'tilnet-blocks' ),
                    'add_or_remove_items'        => __( 'Add or remove Types', 'tilnet-blocks' ),
                    'choose_from_most_used'      => __( 'Choose from the most used Types', 'tilnet-blocks' ),
                    'not_found'                  => __( 'No Types found.', 'tilnet-blocks' ),
                    'no_terms'                   => __( 'No Types', 'tilnet-blocks' ),
                    'menu_name'                  => __( 'Types', 'tilnet-blocks' ),
                    'items_list_navigation'      => __( 'Types list navigation', 'tilnet-blocks' ),
                    'items_list'                 => __( 'Types list', 'tilnet-blocks' ),
                    'most_used'                  => _x( 'Most Used', 'til_type', 'tilnet-blocks' ),
                    'back_to_items'              => __( '&larr; Back to Types', 'tilnet-blocks' ),
                ),
                'show_in_rest'      => true,
                'rest_base'         => 'til_type',
                'rest_controller_class' => 'WP_REST_Terms_Controller',
            ) );

        }
    }
    
endif;

