/**
 * Externals
 */
import {assign} from 'lodash';
const { select,subscribe } = wp.data;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { addFilter } = wp.hooks;
const { createHigherOrderComponent,compose } = wp.compose;

const enableOnBlocks = [
    'core/group',
];

import {getBlockByClassName} from '../utils/selectors';

export const addAttribute = (settings) => {

    if ( enableOnBlocks.includes( settings.name ) ) {

        settings.attributes = assign( settings.attributes, {
            hasVeticalHeader: {
                type: 'boolean',
                default: false,
            },
        } );  
    }
    return settings;  
}

const withVericalFlags = createHigherOrderComponent( ( BlockListBlock ) => {
    
    return ( props ) => {

        if ( enableOnBlocks.includes( props.name ) ) {

            let innerBlocks = select('core/editor').getBlocks(props.clientId);

            const verticalBlocks = getBlockByClassName(innerBlocks,'core/heading','is-style-vetical');

            let hasVertical =   (verticalBlocks && verticalBlocks.length);

            props.setAttributes( { hasVeticalHeader: hasVertical } );

            let unsubscribe = subscribe( (debug) => {

                const innerBlocks = select('core/editor').getBlocks(props.clientId);
            
                const verticalBlocks = getBlockByClassName(innerBlocks,'core/heading','is-style-vetical');

                const newHasVertical = (verticalBlocks && verticalBlocks.length);

                if (newHasVertical != hasVertical) {
                    
                    hasVertical = newHasVertical;

                    props.setAttributes( { hasVeticalHeader: hasVertical } );

                }

            });               

        }

        return <BlockListBlock { ...props } className={ "block-" + props.clientId } />;
    };
}, 'withVericalFlags' );

addFilter( 'editor.BlockListBlock', 'til/with-client-id-class-name', withVericalFlags );
addFilter( 'blocks.registerBlockType', 'til/with-vetical-flags/addAttribute', addAttribute );
