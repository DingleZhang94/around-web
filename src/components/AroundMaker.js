import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps';

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
        const {location,url,message,user} = this.props.post;
        const {lat, lon} = location;
        return (
            <Marker
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
                position={{ lat:lat, lng: lon }}
            >
                {this.state.isOpen ?
                    <InfoWindow>
                        <div>
                            <img className="marker-img" src={url} alt="img"/>
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow> : null}

            </Marker>
        )
    }
}
