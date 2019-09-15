/**
 * Utilities
 */

 /**
  * Externals
  */
import { reduce } from 'lodash';
const { getBlockTypes, createBlock } = wp.blocks;
const { __ } = wp.i18n;

/**
 * Internals
 */
import { API_NAMESPACE } from './constants';
import {
	getBlocksTypesList, 
	getPostsBlocks, 
	getPostsTypesList,
	getTaxonomiesList,
	// getPostsTermsIds,
	// getPostsTermsList
} from './selectors';

export {
	API_NAMESPACE,
	getBlocksTypesList,
	getPostsBlocks,
	getPostsTypesList,
	getTaxonomiesList,
	// getPostsTermsIds,
	// getPostsTermsList
};


// export const getBlocksTypesList = () => reduce(
//     getBlockTypes(),
//     ((r,v)=>{
//         if(0===v.name.indexOf( API_NAMESPACE )){
//             r.push({label:v.title,value:v.name});
//         };
//         return r;
//     }),
//     [{label:__("Select Block"),value: ""}]
// );

// export const getPostsBlocks = (posts,blockType) => reduce (
// 	posts,
// 	((r,v)=>{
// 		if (v.blocks && v.blocks.length) {
// 			const blocks = reduce (
// 				v.blocks,
// 				((rr,vv)=>{
// 					if (vv.blockName == blockType) {
// 						rr.push({
// 							Block: createBlock(vv.blockName,vv.attrs)
// 						});
// 					}
// 					return rr;
// 				}),
// 				[]
// 			);
// 			if (blocks && blocks.length) {
// 				r.push({
// 					id: v.id,
// 					link: v.link,
// 					blocks: blocks
// 				});
// 			}
// 		}
// 		return r;	
// 	}),
// 	[]
// );