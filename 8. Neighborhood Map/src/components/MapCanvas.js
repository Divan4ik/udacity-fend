import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
const MapCanvas = withScriptjs(withGoogleMap(props => {
  return <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>
}))
export default MapCanvas;
