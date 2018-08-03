import React, { Component } from 'react'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import Popup from './components/Popup.js'
import { getAll } from './data/FoursquareAPI.js'

class App extends Component {

  constructor(props) {
    super(props)

    this.onFilterLocations = this.onFilterLocations.bind(this)
    this.userClickLocation = this.userClickLocation.bind(this)
  }

  state = {
    center: false,
    menu: false,
    clicked: false,
    places: [],
    filteredPlaces: false
  }

  componentDidMount() {
    getAll()
      .then(data => {
        this.setState({ places: data.venues})
      })
      .catch(error => {
        this.setState({error: 'Cannot load data, check internet connection'})
      })
  }

  onFilterLocations(locations) {
    this.setState({
      filteredPlaces: locations
    })
  }

  userClickLocation(id) {
    this.setState({
      clicked: this.getLocationInfo(id),
      menu: false
    });
  }

  // on resolutions more than 768px this param will ignore
  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }

  popup(id) {
    this.setState({ clicked: this.getLocationInfo(id) });
  }

  getLocationInfo(id) {
    let sameLocation = this.state.places.filter(loc => loc.id === id)
    return sameLocation[0] || false
  }

  render() {
    return (
      <main className="app">
      <header className="app-header bg-dark px-1">
        <button onClick={() => this.toggleMenu() } className="toggle-sidebar">
          <span aria-label="toggle menu">Menu</span>
        </button>
        Neighborhood Map (React)
      </header>
      <div className="col-container">
        <div className="col sidebar bg-dark py-1">
          <Sidebar
            onUserSelect={this}
            show={this.state.menu}
            userClick={this.userClickLocation}
            onFilterLocations={this.onFilterLocations}
            filteredPlaces={this.state.filteredPlaces}
            places={this.state.places}
          />
        </div>
        <div className="col map">
          <Map
            panTo={this.state.clicked}
            places={this.state.places}
            filteredPlaces={this.state.filteredPlaces}
            onMapMounted={this.onMapMounted}
          />
          <Popup show={this.state.clicked} onClose={()=> this.setState({clicked: false, menu: true})}/>
        </div>
      </div>
      </main>
    );
  }
}

export default App;
