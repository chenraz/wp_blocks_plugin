/**
 * Selectors
 */

 /**
  * Externals
  */
import { reduce, filter } from 'lodash';
const { getBlockTypes, createBlock } = wp.blocks;
const { __ } = wp.i18n;

/**
 * Internals
 */
import { API_NAMESPACE } from './constants';

export const getBlocksTypesList = (blockTypes) => reduce(
    blockTypes,
    ((r,v)=>{
        if(0===v.name.indexOf( API_NAMESPACE )){
            r.push({label:v.title,value:v.name});
        };
        return r;
    }),
    [{label:__("Select Block"),value: ""}]
);

export const getPostsTypesList = (postTypes) => reduce(
    postTypes,
    ((results,value) => {
        results.push({
            label: value.name,
            value: value.slug
        });
        return results;
    }),
    []			
);

export const getTaxonomiesList = (taxonomies) => reduce (
    taxonomies,
    ((r,v)=>{
        r.push({label:v.name,value:v.slug});
        return r;
    }),
    [{label:__("Use Taxonomy"),value: ""}]				
)

export const getPostsBlocks = (posts,blockType) => reduce (
	posts,
	((r,v)=>{
		if (v.blocks && v.blocks.length) {
			const blocks = reduce (
				v.blocks,
				((rr,vv)=>{
					if (vv.blockName == blockType) {
						rr.push({
							Block: createBlock(vv.blockName,vv.attrs)
						});
					}
					return rr;
				}),
				[]
			);
			if (blocks && blocks.length) {
				r.push({
					id: v.id,
					link: v.link,
					blocks: blocks
				});
			}
		}
		return r;	
	}),
	[]
);

/**
 * Find block that match name and className
 * 
 * @param {*} blocks 
 * @param {*} blockName 
 * @param {*} className 
 */
export const getBlockByClassName = (blocks,blockName,className) => filter(blocks,(block)=>{
	return (
		block.name == blockName
		&& block.attributes.className && block.attributes.className.includes(className)
	);
});
