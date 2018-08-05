import React, { Component } from 'react'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import Popup from './components/Popup'
// import Status from './components/Status'
import { getAll } from './data/FoursquareAPI'

/*
* App main component
*
*/
class App extends Component {

  constructor(props) {
    super(props)

    //save context
    this.onFilterLocations = this.onFilterLocations.bind(this)
    this.userClickLocation = this.userClickLocation.bind(this)
    this.onMapError = this.onMapError.bind(this)
  }

  state = {
    error: false,
    center: false,
    menu: false,
    clicked: false,
    places: [],
    filteredPlaces: false
  }

  /*
  * init function
  * get locations from FoursquareAPI
  */
  componentDidMount() {
    getAll()
      .then(data => {
        this.setState({ places: data.venues})
      })
      .catch(error => {
        this.setState({error: 'Cannot load data, check internet connection'})
      })
  }

  /*
  * save filtered location (matched in Sidebars searchbox)
  */
  onFilterLocations(locations) {
    this.setState({
      filteredPlaces: locations
    })
  }

  onMapError() {
    this.setState({error:true})
  }

  /*
  * this handler saves marker object
  */
  userClickLocation(id) {
    this.setState({
      clicked: this.getLocationInfo(id),
      menu: false
    });
  }

  /*
  * this handler function toggle sidabar
  * on resolutions more than 768px this param will ignore
  */
  toggleMenu() {
    this.setState({
       menu: !this.state.menu,
       clicked: false,
    });
  }

  /*
  * open popup, pass location into Popup compopent
  */
  popup(id) {
    this.setState({ clicked: this.getLocationInfo(id) });
  }

  /*
  * helper
  */
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
        {
          /* due known bug Status component disabled
          https://bugs.chromium.org/p/chromium/issues/detail?id=678075
          <Status />  */
        }
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
         { this.state.error ? (
            <div className="error">Error load map</div>
          ):(
            <Map
              onMapError={this.onMapError}
              panTo={this.state.clicked}
              places={this.state.places}
              filteredPlaces={this.state.filteredPlaces}
              onMapMounted={this.onMapMounted}
              userClick={this.userClickLocation}
            />
          )}
          <Popup show={this.state.clicked} onClose={()=> this.setState({clicked: false, menu: true})}/>
        </div>
      </div>
      </main>
    );
  }
}

export default App;
