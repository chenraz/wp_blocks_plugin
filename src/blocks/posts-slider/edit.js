/**
 * Post Slider Edit
 * Base on latest-posts block
 */

/**
 * External dependencies
 */

import { Fragment,useRef } from 'react';
import { isUndefined, isEmpty, pickBy,reduce } from 'lodash';
// import classnames from 'classnames';

import Slider from '../../local-react-components/elements/slider';
import Post from '../../local-react-components/elements/post';

const { Component, createRef } = wp.element;
const {
	PanelBody,
	Placeholder,
	QueryControls,
	Spinner,
	RadioControl,
	ToggleControl,
	SelectControl,
} = wp.components;
// const apiFetch = wp.apiFetch;
const { __ } = wp.i18n;
const {
	InspectorControls,
	BlockControls,
	withColors,
} = wp.blockEditor;
const { withSelect } = wp.data;
const {getSaveElement} = wp.blocks;
const { compose } = wp.compose;
const {PanelColorSettings} = wp.editor;

/**
 * Internal Dependencies
 */

import {
	withMouseNavigation,
} from '../../components';

import { 
	getBlocksTypesList, 
	getPostsTypesList, 
	getTaxonomiesList, 
	getPostsBlocks,
} from '../../utils';

import {getPostsTermsIds,getPostsTermsList} from '../../local-react-components/utils/selectors';
// import Post from '../../local-react-components/elements/post';
const Block = ({post}) => {
	
	const blockObj = post.blocks && post.blocks.length 
		? post.blocks[0].Block
		: false;	
	
	return blockObj && getSaveElement(blockObj.name, blockObj.attributes);

}

/**
 * Module Constants
 */

class PostSliderEdit extends Component {
	constructor() {
		super( ...arguments );
		this.exerptEl = createRef();		
	}

	render() {

		const { 
			attributes, 
			setAttributes, 
			sliderPosts,
			postsTypesList,
			blocksTypesList,
			taxonomiesList,
			textColor,
			setTextColor,
			accentColor,
			setAccentColor,
		} = this.props;

		const { 
			contentLayout,
			showTitle,
			showExcerpt,
			showThumbnail,
			displayPostDate, 
			order, 
			orderBy, 
			postType, 
			blockType, 
			taxonomy,
			postsToShow 
		} = attributes;
		
		const hasPosts = Array.isArray( sliderPosts ) && sliderPosts.length;

		console.log ('set setTextColor',setTextColor);
		// const exerptEl = React.createRef();

		const displayPosts = sliderPosts.length > postsToShow ?
			sliderPosts.slice( 0, postsToShow ) :
			sliderPosts;

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Post Settings' ) }>
					<SelectControl
						label={ __( 'Post Type' ) }
						value={ postType }
						onChange={ ( value ) => setAttributes( { postType: value,taxonomy: '' } ) }
						options = {postsTypesList}
					/>

					<SelectControl
						label={ __( 'Taxonomy' ) }
						value={ taxonomy }
						onChange={ ( value ) => setAttributes( { taxonomy: value } ) }
						options = {taxonomiesList}
					/>	
				</PanelBody>

				<PanelBody title={ __( 'Source Control' ) }>
					<RadioControl
						label="Source:"
						selected={ contentLayout }
						options={ [
							{ label: 'Post Meta', value: 'post' },
							{ label: 'Blocks', value: 'blocks' },
						] }
						onChange={ ( value ) => setAttributes( { contentLayout: value } ) }
					/>									
				</PanelBody>	

				{ 'post' === contentLayout &&
					<PanelBody title={ __( 'Content Settings' ) }>
						<ToggleControl
							label={ __( 'Display title' ) }
							checked={ showTitle }
							onChange={ ( value ) => setAttributes( { showTitle: value } ) }
						/>						
						<ToggleControl
							label={ __( 'Display excerpt' ) }
							checked={ showExcerpt }
							onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
						/>

						<ToggleControl
							label={ __( 'Display thumbnail' ) }
							checked={ showThumbnail }
							onChange={ ( value ) => setAttributes( { showThumbnail: value } ) }
						/>	
						<ToggleControl
							label={ __( 'Display post date' ) }
							checked={ displayPostDate }
							onChange={ ( value ) => setAttributes( { displayPostDate: value } ) }
						/>						
					</PanelBody>
				}

				{ 'blocks' === contentLayout &&
					<PanelBody title={ __( 'Blocks Settings' ) }>
						<SelectControl
							label={ __( 'Block Type' ) }
							value={ blockType }
							onChange={ ( value ) => setAttributes( { blockType: value } ) }
							options = {blocksTypesList}
						/>
					</PanelBody>
				}

				{showExcerpt && 
					<PanelColorSettings
						title={ __( 'Colors' ) }
						initialOpen={ true }
						colorSettings={ [ 
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
							{
								value: accentColor.color,
								onChange: setAccentColor,
								label: __( 'Accent Color' ),
							}							

							
					 	] }
					/>
				}				

				<PanelBody title={ __( 'Sorting and Filtering' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						selectedPostTypeId={ postType }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);

		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'Posts Slider' ) }
					>
						{ ! Array.isArray( sliderPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		return (
			<Fragment > 
				{ inspectorControls }
				<BlockControls />

				<Slider exerptEl={this.exerptEl} {...attributes} {...this.props}>
					{'post' === contentLayout && sliderPosts &&
						sliderPosts.map((post,i)=><Post exerptEl={this.exerptEl} key={i} {...{post:post,showTitle,showExcerpt,showThumbnail}}/>)
					}
					{'blocks' === contentLayout && sliderPosts && sliderPosts.length &&
						sliderPosts.map((post,i)=><Block key={i} post={post} />)
					}					
				</Slider>

			</Fragment> 
		);
	}
}

const withPostOptions = withSelect ((select,props)=>{
	
	const {getPostTypes,getTaxonomies} = select('core');
	const { getBlockTypes } = select('core/blocks');
	const { postType } = props.attributes;

	return {
		postsTypesList: getPostsTypesList(
			getPostTypes()
		),
		blocksTypesList: getBlocksTypesList(
			getBlockTypes()
		),
		taxonomiesList: getTaxonomiesList(
			getTaxonomies({type: postType})
		),
	};

});

const withSliderPosts = withSelect( ( select, props,debug ) => {
	const { contentLayout, postsToShow, order, orderBy, postType,blockType,taxonomy } = props.attributes;
	const { getEntityRecords } = select( 'core' );
	
	const sliderPostsQuery = pickBy( {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	
	const posts 	= getEntityRecords( 'postType', postType, sliderPostsQuery ); 
	
	let sliderPosts = [];
	if (posts && posts.length) {
		sliderPosts = 'blocks' === contentLayout
			?	getPostsBlocks (posts,blockType)
			:	posts;
	}

	const sliderPostsCount = sliderPosts
		?	sliderPosts.length
		:	0;

	const sliderTermsIds = (sliderPostsCount && taxonomy && taxonomy.length)
		?	getPostsTermsIds (posts,taxonomy)
		:	false;

	const sliderPostsTerms = (sliderTermsIds && sliderTermsIds.length ) 
		?	getEntityRecords ('taxonomy',taxonomy,{"include" : sliderTermsIds})
		:	[];

	const sliderTerms = (sliderPostsTerms && sliderPostsTerms.length) 
		?	getPostsTermsList (sliderPostsTerms, taxonomy)
		:	[];

	return {
		sliderPosts: sliderPosts,
		sliderTerms: sliderTerms,
		allowedNavigation: {
			right: sliderPostsCount > 1,
			left: sliderPostsCount > 1,
		},
	}
} );


const EditFunc = compose([
	withPostOptions,
	withSliderPosts,
	withMouseNavigation,
	withColors( 'textColor','accentColor' ),
])( PostSliderEdit );

export default EditFunc;
