/**
 * External dependencies
 */
import classnames from 'classnames';
import ImageUpload from '../../components/imageUpload';

// const { withSelect } = wp.data;
const { compose } = wp.compose;
const { __ } = wp.i18n; 
const {
	InspectorControls,
	// InnerBlocks,
	PanelColorSettings,
	withColors,
} = wp.editor

const {RichText} = wp.blockEditor;

function PortfolioEdit ({
	className,
	setBackgroundColor,
	backgroundColor,
	attributes: { image,excerpt }, 
	setAttributes
	// hasInnerBlocks,
}) {
	const styles = {
		backgroundColor: backgroundColor.color,
	};

	const classes = classnames( className, backgroundColor.class, {
		'has-background': !! backgroundColor.color,
	} );

	const onChangeExcerpt = ( newExcerpt ) => {
		setAttributes( { excerpt: newExcerpt } );
	};	

	const onSetImage = ( newImage ) => {
		setAttributes( { image: newImage.url } );
	};		

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
				<div className='portfolio-image'>
					<ImageUpload
						onSetImage={ onSetImage }
						image={image}
						placeholder="Insert Image"
					/>
				</div>

				<div className='portfolio-exerpt'>
					<RichText
						tagName="div"
						className="exerpt-reachtext"
						placeholder="some content"
						onChange={ onChangeExcerpt }
						value={ excerpt }
					/>
				</div>
			</div>
        </div>
	);    
}

export default compose( [
	withColors( 'backgroundColor' ),
	// withSelect( ( select, { clientId } ) => {
	// 	const {
	// 		getBlock,
	// 	} = select( 'core/block-editor' );

	// 	const block = getBlock( clientId );

	// 	return {
	// 		hasInnerBlocks: !! ( block && block.innerBlocks.length ),
	// 	};
	// } ),
] )( PortfolioEdit );