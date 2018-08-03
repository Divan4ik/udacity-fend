import React from 'react'

/* eslint no-script-url: "error"*/

class Sidebar extends React.Component {

  state = {
    query: '',
    show: false
  }

  updateQuery = (value) => {
		this.setState({ query: value });
		this.updateList(value);
	}

  toggleClick(id) {
    this.props.userClick(id)
  }

  updateList(query) {
    if(query === '') {
       this.props.onFilterLocations( this.props.places )
    }

    let filtered = this.props.places.filter(place => place.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
	  this.props.onFilterLocations( filtered )
	}

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
