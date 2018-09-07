import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps';
import blueMarkerUrl from '../assets/blue-marker.svg';

export default class AroundMaker extends Component {
    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState((prev) => {
            this.setState({
                isOpen: !prev.isOpen
            })
        });
    }

    render() {
        const {location,url,message,user, type} = this.props.post;
        const {lat, lon} = location;
        const isImagePost = type === 'image';
        const icon = isImagePost ? undefined : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41),
          }
        return (
            <Marker
                onMouseOver={isImagePost? this.toggleOpen: undefined}
                onMouseOut={isImagePost? this.toggleOpen: undefined}
                onClick={!isImagePost ? this.toggleOpen: undefined}
                position={{ lat:lat, lng: lon }}
                icon={icon}
            >
                {this.state.isOpen ?
                    <InfoWindow>
                        <div>
                            {isImagePost ? <img className="marker-img" src={url} alt="img"/>
                            : <video className="marker-video" src={url} alt="video" controls/>} 
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow> : null}

            </Marker>
        )
    }
}
