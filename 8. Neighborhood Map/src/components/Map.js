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
    map: false
  }

  panTo(mark) {
    this.state.map.panTo({lat:mark.latitude, lng: mark.longtitude})
  }

  onMapMounted(ref) {
    if (ref) {
      let map = ref.context[MAP];
      this.setState({ map: map })
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.panTo) {
      this.panTo(newProps.panTo)
    }
  }

  render() {
    let markers = this.props.places;

    if(this.props.filteredPlaces) {
      markers = this.props.filteredPlaces
    }


    return (
      <MapCanvas
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `calc(100vh - 50px)` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMapMounted={this.onMapMounted}
        defaultZoom={14}
        defaultCenter={{ lat: 40.613928, lng:  -73.997353 }}
      >

        {markers.map( (mark, i) => {
          return (
            <Marker
            ref={this.props.ref}
            key={mark.id}
            position={{ lat: mark.latitude, lng: mark.longtitude}}
            label={mark.name}
            />
          )
        })}
      </MapCanvas>
    )
  }
}

export default Map
