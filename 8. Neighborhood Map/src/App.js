import React, { Component } from 'react'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import Popup from './components/Popup.js'
import locations from './data/locations.json'

class App extends Component {

  constructor(props) {
    super(props)

    this.onFilterLocations = this.onFilterLocations.bind(this)
    this.userClickLocation = this.userClickLocation.bind(this)
  }

  state = {
    center: false,
    clicked: false,
    places: [],
    filteredPlaces: false
  }

  componentDidMount() {
    this.setState({places: locations.locations})
  }

  onFilterLocations(locations) {
    this.setState({
      filteredPlaces: locations
    })
  }

  userClickLocation(id) {
    this.setState({
      clicked: this.getLocationInfo(id)
    });
  }

  popup(id) {
    this.setState({ clicked: this.getLocationInfo(id) });
  }

  getLocationInfo(id) {
    let sameLocation = this.state.places.filter(loc => loc.id === id)
    return sameLocation[0] || false
  }

  closePopup() {}

  render() {
    return (
      <main className="app">
      <header className="app-header bg-dark px-1">Neighborhood Map (React)</header>
      <div className="col-container">
        <div className="col sidebar bg-dark py-1">
          <Sidebar onUserSelect={this} popup={this.popup} userClick={this.userClickLocation} onFilterLocations={this.onFilterLocations} filteredPlaces={this.state.filteredPlaces} places={this.state.places} />
        </div>
        <div className="col map">
          <Map
            panTo={this.state.clicked}
            places={this.state.places}
            filteredPlaces={this.state.filteredPlaces}
            onMapMounted={this.onMapMounted}
            popup={this.popup}
          />
        </div>
        <Popup show={this.state.clicked} onClose={()=> this.setState({clicked: false})}/>
      </div>
      </main>
    );
  }
}

export default App;
