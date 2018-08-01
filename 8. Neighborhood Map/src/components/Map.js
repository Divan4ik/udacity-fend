import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => {

  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={14}
      defaultCenter={{ lat: 40.613928, lng:  -73.997353 }}
    >
      {props.places.locations.map( (mark, i) => {
        return (
          <Marker
              ref={props.ref}
    					key={mark.id}
    					position={{ lat: mark.latitude, lng: mark.longtitude}}
    					label={mark.name}
    					//onClick={this.handleToggle}
    				></Marker>
        )
      })}
    </GoogleMap>
  )
}))

export default Map
