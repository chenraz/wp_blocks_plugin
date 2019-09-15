/**
 * The Block Attributes
 */

 /**
  * Externals
  */

const { __ } = wp.i18n;


export default {
    "contentLayout": {
        "type": "string",
        "default": "post"
    },
    "showExcerpt": {
        "type": "boolean",
        "default": true,
    },
    "showThumbnail": {
        "type": "boolean",
        "default": true,
    },    
    // "title": {
    //     "type": "string",
    // },
    // "subTitle": {
    //     "type": "string",
    // },
    "align": {
        "type": "string"
    },
    "className": {
        "type": "string"
    },
    "postType": {
        "type": "string",
        "default": "post",
    },
    "blockType": {
        "type": "string",
        "default": "",
    },
    "taxonomy": {
        "type": "string",
        "default": "",
    },    

    "postsToShow": {
        "type": "number",
        "default": 5,
    },	

    "displayPostDate": {
        "type": "boolean",
        "default": false,
    },	

    "order": {
        "type": "string",
        "default": "desc",
    },	
    "orderBy": {
        "type": "string",
        "default": "date",
    },					
}