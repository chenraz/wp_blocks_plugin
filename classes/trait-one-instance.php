<?php
/**
 * One Instance  Trait 
 *
 * @author   Tilnet
 * @category Admin
 * @version  1.1.0
 */

namespace Tilnet;




if (!defined('ABSPATH')) {
    exit;
}

if (!trait_exists('One_Instance', false)) :
    
    /**
     * One Instance Trait.
     */
    trait One_Instance
    {
        /**
         * Plugin single instance
         * 
         * @static
         */
        protected static  $instance = null;
        
        /**
         * Plugin Instance.
         *
         * Ensures only one instance is loaded or can be loaded.
         *
         * @static
         */
        public static function instance($args = null)  
        {
            if ( is_null( static::$instance ) ) {
                static::$instance = new static($args);
            }
            return static::$instance;
        } 
        
        /**
         * Construct the plugin
         */
        public function __construct ($args = null)
        {
            
        }         
    }
endif;

