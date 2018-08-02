import React, { Component } from 'react'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import locations from './data/locations.json'

class App extends Component {

  constructor(props) {
    super(props)

    this.panTo = this.panTo.bind(this)
    this.onMapMounted = this.onMapMounted.bind(this)
  }

  state = {
    center: false,
    places: []
  }

  componentDidMount() {
    this.setState({places: locations})
  }

  onMapMounted(ref) {
        console.log(ref);
        if (ref) {
          let map = ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          this.setState({ map: map })
        }
        // window.google.maps.event.trigger(ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, 'resize'); 4
        // ref.context.setCenter(this.state.center);
    }

  panTo(id) {
    let mark = false;
    this.state.places.locations.map(loc => {
      if(loc.id === id) mark = loc
    })
    this.state.map.panTo({lat:mark.latitude, lng: mark.longtitude})
  }

  render() {
    return (
      <main className="app">
      <header className="app-header bg-dark px-1">Neighborhood Map (React)</header>
      <div className="col-container">
        <div className="col sidebar bg-dark py-1">
          <Sidebar panTo={this.panTo} places={this.state.places} />
        </div>
        <div className="col map">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100vh - 50px)` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={this.state.places}
            onMapMounted={this.onMapMounted}
          />
        </div>
      </div>
      </main>
    );
  }
}

export default App;
