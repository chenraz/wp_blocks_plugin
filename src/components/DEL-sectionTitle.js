/**
 * Section Title
 */

/**
 * Wordpress Dependencies
 */
const { RichText} = wp.blockEditor;


const SectionTitle = (props) => {
    const {title,tagName,className,onChange,placeholder,multiline} = props;
    return  ( 
        <RichText
            tagName= {tagName || "div" }
            className= { className || "section-title" }
            value = { title }	
            onChange = { onChange || '' }
            placeholder = { placeholder || "Title Here" }
            multiline = { multiline || false }
        />
    );
};

export default SectionTitle;