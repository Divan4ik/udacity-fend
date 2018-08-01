import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 40.613928, lng:  -73.997353 }}
  >
    {props.places.locations.map( mark => {
      return (
        <Marker
  					key={mark.i}
  					position={{ lat: mark.latitude, lng: mark.longtitude}}
  					label={mark.name}
  					//onClick={this.handleToggle}
  				></Marker>
      )
    })}
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export default Map
