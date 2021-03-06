import React, { Component } from 'react';
import GridGallery from 'react-grid-gallery';
import PropTypes from 'prop-types'; 


export default class Gallery extends Component {
    static propsTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    user: PropTypes.string.isRequired,
                    src: PropTypes.string.isRequired,
                    thumbnail: PropTypes.string.isRequired,
                    caption: PropTypes.string,
                    thumbnailWidth: PropTypes.number.isRequired,
                    thumbnailHeight: PropTypes.number.isRequired
                }
            )
        ).isRequired
    }

    render() {
        const images = this.props.images.map(image => ({
            ...image,
            customOverlay: (
                <div style={captionStyle}>
                    {`${image.user}: ${image.caption}`}
                </div>
            )
        }));
        return (
            <div style={wrapperStyle}>
                <GridGallery images={images} enableImageSelection={false}
                    backdropClosesModal={true} />
            </div>
        )
    }
}

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    overflow: "auto"
};