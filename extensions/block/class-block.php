<?php
/**
 * Blok
 */

namespace Tilnet\Block;

if (!class_exists('\Tilnet\Block')) :
    
     include_once ('class-block-parser.php');
    
    
    final class Block  {
        
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
            
            // Assets
            add_action( 'init', [__CLASS__,'register_scripts'],5 );
            
            // Blocks
            add_action( 'init', [__CLASS__,'register_blocks'] );            
            add_action ('init',[__CLASS__,'register_blocks_style']);
            add_filter( 'block_categories', [__CLASS__,'block_categories'] );
            add_filter( 'block_parser_class', [__CLASS__,'block_parser_class']);
        }
        
        /**
         * 
         */
        public static function register_scripts ()
        {
            // Register block styles for both frontend + backend.
            wp_register_style(
                'tilnet_blocks-cgb-style-css', 
                \Tilnet\TIL()::$url . '/dist/blocks.style.build.css',  
                array( 'wp-editor' ), 
                null 
            );

            // Register block editor script for backend.
            wp_register_script(
                'tilnet_blocks-cgb-block-js', 
                \Tilnet\TIL()::$url .'/dist/blocks.build.js', 
                array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), 
                null, 
                true 
            );

            // Register block editor styles for backend.
            wp_register_style(
                'tilnet_blocks-cgb-block-editor-css', 
                \Tilnet\TIL()::$url . '/dist/blocks.editor.build.css', 
                array( 'wp-edit-blocks' ), 
                null 
            );  
        }

        /**
         * 
         */
        public static function register_blocks ()
        {
            // wellcome block
            register_block_type(
                'til/wellcome', array(
                    'style'         => 'tilnet_blocks-cgb-style-css',
                    'editor_script' => 'tilnet_blocks-cgb-block-js',
                    'editor_style'  => 'tilnet_blocks-cgb-block-editor-css',
                )
            );    

            // slider block
            register_block_type(
                'til/blocks-slider', array(
                    'style'         => 'tilnet_blocks-cgb-style-css',
                    'editor_script' => 'tilnet_blocks-cgb-block-js',
                    'editor_style'  => 'tilnet_blocks-cgb-block-editor-css',
                )
            );            
        }   
        
        /**
         * 
         */
        public static function register_blocks_style ()
        {
            
            register_block_style(
                'core/heading',
                array(
                    'name'         => 'horizontal',
                    'label'        => __( 'Horizontal' ),
                    'isDefault'    =>  true,
                )
            );      
            
            register_block_style(
                'core/heading',
                array(
                    'name'         => 'vetical',
                    'label'        => __( 'Vetical' ),
                    'inline_style' => '.wp-block-heading .is-style-vetical { transform: rotate(-90deg);position: absolute; }',
                )
            );              
        }        
        
        /**
         * 
         * @param type $cats
         * @return type
         */
        public static function block_categories ($cats)
        {
            return array_merge(
                $cats,
                [
                    [
                        'slug' => 'til-blocks',
                        'title' => __( 'Tilnet Blocks'),
                        'icon'  => 'admin-site-alt3',                
                    ]
                ]
            );            
        }
        
        /**
         * 
         * @param type $class
         * @return string
         */
        public static function block_parser_class ($class)
        {
            return '\Tilnet\Block\Block_Parser';
            
        }  
        


    }
    
endif;