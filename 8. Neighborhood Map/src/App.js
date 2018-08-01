import React, { Component } from 'react'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import locations from './data/locations.json'

class App extends Component {

  state = {
    places: []
  }

  componentDidMount() {
    console.log(locations);
    this.setState({places: locations})
  }

  render() {
    return (
      <main>
      <header className="app-header bg-dark px-1">Neighborhood Map (React)</header>
      <div className="col-container">
        <div className="col sidebar bg-dark py-1">
          <Sidebar places={this.state.places} />
        </div>
        <div className="col map">
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `calc(100vh - 50px)` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={this.state.places}
          />
        </div>
      </div>
      </main>
    );
  }
}

export default App;
