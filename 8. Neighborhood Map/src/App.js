import React, { Component } from 'react'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import locations from './data/locations.json'
import {MAP} from 'react-google-maps/lib/constants'

class App extends Component {

  constructor(props) {
    super(props)

    this.panTo = this.panTo.bind(this)
    this.onMapMounted = this.onMapMounted.bind(this)
    this.onFilterLocations = this.onFilterLocations.bind(this)
  }

  state = {
    center: false,
    places: [],
    filteredPlaces: []
  }

  componentDidMount() {
    this.setState({places: locations.locations})
  }

  onFilterLocations(locations) {
    this.setState({ filteredPlaces: locations })
  }

  onMapMounted(ref) {
        if (ref) {
          let map = ref.context[MAP];
          this.setState({ map: map })
        }
    }

  panTo(id) {
    let mark = false;
    this.state.places.map(loc => {
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
          <Sidebar panTo={this.panTo} onFilterLocations={this.onFilterLocations} filteredPlaces={this.state.filteredPlaces} places={this.state.places} />
        </div>
        <div className="col map">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100vh - 50px)` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={this.state.places}
            filteredPlaces={this.state.filteredPlaces}
            onMapMounted={this.onMapMounted}
          />
        </div>
      </div>
      </main>
    );
  }
}

export default App;
