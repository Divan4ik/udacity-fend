import React from 'react'
import { Marker } from "react-google-maps"
import MapCanvas from './MapCanvas.js'
import {MAP} from 'react-google-maps/lib/constants'

class Map extends React.Component {

  constructor(props) {
    super(props)

    this.onMapMounted = this.onMapMounted.bind(this)
  }

  state = {
    map: false,
    markers: []
  }

  panTo(mark) {
    this.state.map.panTo({lat:mark.location.lat, lng: mark.location.lng})
    this.state.map.setZoom(15)
  }

  setBounds() {
    let bounds = new window.google.maps.LatLngBounds()

    for (var i = 0; i < this.state.markers.length; i++) {
        bounds.extend({ lat: this.state.markers[i].location.lat, lng: this.state.markers[i].location.lng});
    }

    this.state.map.fitBounds(bounds);
  }

  onMapMounted(ref) {
    if (ref) {
      let map = ref.context[MAP];
      this.setState({ map: map })
    }
  }

  componentDidUpdate() {
    if(!this.props.panTo && this.state.map && this.state.markers.length > 0) {
      this.setBounds()
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.panTo)
      this.panTo(newProps.panTo)

    let markers = newProps.places;

    if(this.props.filteredPlaces) {
      markers = newProps.filteredPlaces
    }

    this.setState({markers:markers})
  }

  render() {
    return (
      <MapCanvas
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `calc(100vh - 50px)` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        options={{disableDefaultUI:true, styles: [
            {
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }
                ]
            }
        ]}}
        onMapMounted={this.onMapMounted}
        defaultZoom={14}
        defaultCenter={{ lat: 40.613928, lng:  -73.997353 }}
      >

        {this.state.markers.length > 0 && this.state.markers.map( (mark, i) => {
          return (
            <Marker
            ref={this.props.ref}
            key={mark.id}
            position={{ lat: mark.location.lat, lng: mark.location.lng}}
            />
          )
        })}
      </MapCanvas>
    )
  }
}

export default Map
