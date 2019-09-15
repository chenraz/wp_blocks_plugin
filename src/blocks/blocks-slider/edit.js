/**
 * External dependencies
 */
import classnames from 'classnames';

const { withSelect } = wp.data;
const { compose } = wp.compose;
const { __ } = wp.i18n; 
const {
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
	withColors,
} = wp.editor

function SliderEdit ({
	className,
	setBackgroundColor,
	backgroundColor,
	hasInnerBlocks,
}) {
	const styles = {
		backgroundColor: backgroundColor.color,
	};

	const classes = classnames( className, backgroundColor.class, {
		'has-background': !! backgroundColor.color,
	} );

	return (
        <div>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color' ),
						},
					] }
				/>
			</InspectorControls>
			<div className={ classes } style={ styles }>
				<div className="wp-block-group__inner-container">
					<InnerBlocks
						renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
        </div>
	);    
}

export default compose( [
	withColors( 'backgroundColor' ),
	withSelect( ( select, { clientId } ) => {
		const {
			getBlock,
		} = select( 'core/block-editor' );

		const block = getBlock( clientId );

		return {
			hasInnerBlocks: !! ( block && block.innerBlocks.length ),
		};
	} ),
] )( SliderEdit );