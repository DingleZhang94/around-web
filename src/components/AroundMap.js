import React, { Component } from 'react';
import {POS_KEY} from '../constant';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

class AroundMap extends Component {
    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <div>
                <GoogleMap
                    defaultZoom={11}
                    defaultCenter={{ lat: lat, lng: lon }}
                >
                    <Marker
                        position={{ lat: lat, lng: lon }}
                    />
                     <Marker
                        position={{ lat: lat + 0.02, lng: lon + 0.01 }}
                    />
                </GoogleMap>
            </div>
        )
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
