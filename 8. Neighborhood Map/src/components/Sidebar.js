import React from 'react'

/* eslint no-script-url: "error"*/

/*
* Sidebar component
* Iterate locations fro App component and provide functionality to filter them
*/
class Sidebar extends React.Component {

  state = {
    query: '',
    show: false
  }

  /*
  * this function helps to save query after update component
  */
  updateQuery = (value) => {
		this.setState({ query: value });
		this.updateList(value);
	}

  /*
  * user click handler
  */

  toggleClick(id) {
    this.props.userClick(id)
  }

  /*
  * this function updates list of locations
  */
  updateList(query) {

    // if query emptry, show all locations
    if(query === '') {
       this.props.onFilterLocations( this.props.places )
    }

    // else filter and update App state
    let filtered = this.props.places.filter(place => place.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
	  this.props.onFilterLocations( filtered )
	}

  /*
  * This function for mobile devices and small screens
  * it collapse sidebar through body class change
  */
  componentWillReceiveProps(nextProps) {
    if(nextProps.show === false) {
      if(!document.body.classList.contains('menu-in')) return
      document.body.classList.toggle('menu-in')
    } else {
        //ignore disabling if props has open
      if(document.body.classList.contains('menu-in')) return
      document.body.classList.toggle('menu-in')
    }
  }

  render() {
    // show all locations or filtered
    let locations = this.props.places;

    if(this.props.filteredPlaces) {
      locations = this.props.filteredPlaces
    }

    return (
      <div aria-hidden="true">
        <div className="filter">
          <input type="text" onChange={(event) => this.updateQuery(event.target.value)} value={this.state.query} placeholder="Search by title or author"/>
        </div>
        <nav className="placesList py-1 overflow-v">
          <ul className="">
            { locations.map(  (mark, i) => {
              return (
                <li tabIndex="0" role="button" onKeyPress={(e) => this.toggleClick(mark.id) }  className="place-item" key={i}>
                  <span  className="place-link px-1"  onClick={(e) => this.toggleClick(mark.id) }>{mark.name}</span>
                </li>
              )
            }) }
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar
