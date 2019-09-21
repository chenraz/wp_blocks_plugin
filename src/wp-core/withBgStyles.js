/**
 * With fullpage controls
 */


import {assign} from 'lodash';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockStyle } = wp.blocks; // Import registerBlockType() from wp.blocks
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const {BlockControls,InspectorControls} = wp.editor;
const {ToggleControl,PanelBody} = wp.components;

console.log ('running the core');

const enableOnBlocks = [
    'core/group',
];

export const addAttribute = (settings) => {

    if ( enableOnBlocks.includes( settings.name ) ) {

        settings.attributes = assign( settings.attributes, {
            isFullPage: {
                type: 'boolean',
            },
        } );  
    }
    return settings;  
}
export const withFullpageControl = createHigherOrderComponent(
	( BlockEdit ) => (
		( props ) => {

            if ( ! enableOnBlocks.includes( props.name ) ) {
                return (
                    <BlockEdit key="edit" { ...props } />
                );
            }            

            const updateIsFullPage = (isFullPage) => {
                props.setAttributes( { isFullPage: isFullPage } );
            }

            return [
                <InspectorControls key="appearance">
                    <PanelBody key="til_appearance" title={__("Appearance")}>
                            <ToggleControl 
                                label={__("Full Page")} 
                                checked = {props.attributes.isFullPage}
                                onChange={updateIsFullPage}
                            />
                    </PanelBody>              
                </InspectorControls>,
                <BlockEdit key="edit" { ...props } />                
            ];
        }
    ),
    'withFullpageControl'  
); 

addFilter( 'blocks.registerBlockType', 'til/with-fullpage-controls/addAttribute', addAttribute );
addFilter( 'editor.BlockEdit', 'til/editor/with-fullpage-controls', withFullpageControl );





