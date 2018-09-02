import React, { Component } from 'react';
import {POS_KEY} from '../constant';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import AroundMaker from './AroundMaker';

class AroundMap extends Component {
    saveMapRef = (mapInstance) => {
        this.map = mapInstance;
    }

    reloadMarkers = () => {
        const mapCenter = this.map.getCenter();
        const center = { lat : mapCenter.lat(), lon:mapCenter.lng()};
        this.props.loadNearbyPosts(center);
    }


    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <div>
                <GoogleMap
                    defaultZoom={11}
                    defaultCenter={{ lat: lat, lng: lon }}
                    ref = {this.saveMapRef}
                    onDragEnd = {this.reloadMarkers}
                >
                    {this.props.posts ? this.props.posts.map((post) => <AroundMaker key={post.url} post={post}/>) : null}
                </GoogleMap>
            </div>
        )
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
