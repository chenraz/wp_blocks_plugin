<?php

/* 
 * Allow reuasable blocks on Rest Api
 */

namespace Tilnet\Rest_Api;

if (!class_exists('Block_Controller')) :
    
    class Block_Controller extends \WP_REST_Posts_Controller {
    
    
	public function __construct(  ) {

            parent::__construct('wp_block');
            $this->namespace = 'til/v1';
            
        }       
        
        /**
         * 
         * @param type $post
         * @return boolean
         */
	public function check_read_permission( $post ) {

            return true; 
        }    
    }
    
endif;

