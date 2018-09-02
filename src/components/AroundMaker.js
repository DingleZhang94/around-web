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
        return (
            <Marker
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
                position={{ lat: this.props.lat, lng: this.props.lon }}
            >
                {this.state.isOpen ?
                    <InfoWindow>
                        <div>content</div>
                    </InfoWindow> : null}

            </Marker>
        )
    }
}
