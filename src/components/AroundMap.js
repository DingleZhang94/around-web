import React, { Component } from 'react';
import {POS_KEY} from '../constant';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import AroundMaker from './AroundMaker';

class AroundMap extends Component {
    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <div>
                <GoogleMap
                    defaultZoom={11}
                    defaultCenter={{ lat: lat, lng: lon }}
                >
                    <AroundMaker lat={lat} lon={lon}/>
                </GoogleMap>
            </div>
        )
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
