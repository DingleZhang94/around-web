import React, { Component } from 'react';
import GridGallery from 'react-grid-gallery';
import PropTypes from 'prop-types';
const IMAGES =
    [{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)",
        customOverlay: (
            <div style={{ backgroundColor: 'white' }}> overlay</div>
        )
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
        caption: "Boats (Jeshu John - designerspics.com)"
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
    }]


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
    border: "1px solid #ddd",
    overflow: "auto"
};