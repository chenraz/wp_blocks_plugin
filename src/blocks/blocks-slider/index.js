/**
 * BLOCK: blocks-slider
 *
 * A slider of blocks
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit from './edit';
import save from './save';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'til/blocks-slider', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Blocks Slider' ), // Block title.
	icon: Icon,
	category: 'til-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Slider from reusable blocks' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — bloks slider' ),
		__( 'slider' ),
	],
	attributes: {
		"backgroundColor": {
			"type": "string"
		},
		"customBackgroundColor": {
			"type": "string"
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	// edit: (props) => {
	// 	console.log('debug edit',props,edit);
	// 	return (
	// 		<Edit {...props} />
	// 	);
	// },

	edit,
	
	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save,
} );
