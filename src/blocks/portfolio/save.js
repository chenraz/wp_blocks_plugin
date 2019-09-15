/**
 * External dependencies
 */
import classnames from 'classnames';
const { InnerBlocks, getColorClassName } = wp.blockEditor;

export default function save( { attributes } ) {
	const { backgroundColor, customBackgroundColor,image,excerpt } = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const className = classnames( backgroundClass, {
		'has-background': backgroundColor || customBackgroundColor,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
	};

	return (
		<div className={ className } style={ styles }>
            <img className="portfolio-image" src={ image } />
			<div className="portfolio-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }}/>
		</div>
	);
}