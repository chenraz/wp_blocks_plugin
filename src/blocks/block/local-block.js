import React from 'react';

const Block = (props) => {
    console.log('props',props);
     const {test} = props;
     return (
        <div id='get-my-block' className='shared'>
            <p>— Hello from the Block as seperate package.</p>
            <p>
                CGB BLOCK: <code>blocks</code> is a new Gutenberg block.
            </p>
            <p>Dynamic content: {test}</p>
        </div>    
    ); 
};

export default Block;

