import React, { Component } from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

class AroundMap extends Component {
    render() {
        return (
            <div>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                >
                    <Marker
                        position={{ lat: -34.397, lng: 150.644 }}
                    />
                     <Marker
                        position={{ lat: -35.397, lng: 150.00}}
                    />
                </GoogleMap>
            </div>
        )
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
