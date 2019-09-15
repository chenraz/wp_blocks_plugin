const {MediaUpload} = wp.blockEditor;
const { Button } = wp.components;

const Img = ({image,placeholder}) => {

    if (! image || ! image.length) {
        return <p>{ placeholder }</p>
    }
    return (
        <img src={ image } />
    );
}

const ImageUpload = (props) => {

    const {image,onSetImage,placeholder} = props;

    return (
        <MediaUpload
            onSelect={ onSetImage }
            value={ image }
            render={ ( { open } ) => (
                <Button onClick={ open }>
                    <Img image={ image } placeholder={placeholder} />
                </Button>
            ) }					
        />
    );
}

export default ImageUpload;