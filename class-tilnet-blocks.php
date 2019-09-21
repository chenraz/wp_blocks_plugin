<?php
/**
 * Plugin Name: Tilnet-Blocks — CGB Gutenberg React Block Plugin
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: tilnet-blocks — is a Gutenberg plugin created via create-guten-block.
 * Author: Chen Raz
 * Author URI: https://tilnet.co.il/
 * Version: 1.0.0
 * License: Tilnet
 *
 * @package CGB
 */

namespace Tilnet;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */

if (!class_exists('Tilnet_Blocks')) :
    
     include_once ('classes/trait-one-instance.php');
     
     /**
      * 
      */
     final class Tilnet_Blocks {
         
        use One_Instance;
        
        /**
         *
         * @var type 
         */
        protected static  $instance = null;     
        
        /**
         *
         * @var type 
         */
        public static $version = '1.0.0';
        
        /**
         *
         * @var type 
         */
        public static $loader =null;
        
        /**
         *
         * @var type 
         */
        public static $extensions = [];
        
        /**
         *
         * @var type 
         */
        public static $dir = null;
        
        /**
         *
         * @var type 
         */
        public static $url = null;

        /**
         * 
         * @param type $args
         */
        public function __construct ($args = null)
        {
            self::$dir = dirname(__FILE__);
            self::$url = untrailingslashit( plugins_url( '/', __FILE__ ) );

            self::init_loader();
            self::init_extensions();
            self::add_actions();            
        }    
        
        /**
         * 
         */
        public static function init_loader() 
        {
             if ( is_null( self::$instance ) ) {
                
                require_once( self::$dir . '/classes/class-psr4-autoloader.php' );
                 
                self::$loader = new Psr4_Autoloader();
                self::$loader->register();
                self::$loader->addNamespace('Tilnet',self::$dir . '/extensions');
                self::$loader->addNamespace('Tilnet',self::$dir . '/classes');

            }
        }
        
        /**
         * 
         */
        static public function init_extensions () 
        {
            self::$extensions = [
                'Block'     => Block\Block::instance(),
                'Rest_Api'  => Rest_Api\Rest_Api::instance(),
                'Portfolio' => Portfolio\Portfolio::instance(),
            ];
        }
        
        /**
         * 
         */
        public static function add_actions () 
        {
            add_action('plugins_loaded',array(__CLASS__,'load_text_domain'));
        }  
        
        /**
         * 
         */
        public static function load_text_domain ()
        {
            load_plugin_textdomain('tilnet-blocks', false, basename( dirname( __FILE__ ) ) . '/lang');
        }
        
        
     }
   
    
endif;

if (!function_exists('TIL')) :
    
    /**
     * Get the single plugin instance
     * 
     * @return Tilnet_Extension
     */
    function TIL ()
    {
        
        return Tilnet_Blocks::instance();
    }

endif;

// start the plugin
TIL();
