import React from 'react'

/* eslint no-script-url: "error"*/

class Sidebar extends React.Component {

  state = {
    query: ''
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

  render() {
    let locations = this.props.places;

    if(this.props.filteredPlaces) {
      locations = this.props.filteredPlaces
    }

    return (
      <div>
        <div className="filter px-1">
          <input type="text" onChange={(event) => this.updateQuery(event.target.value)} value={this.state.query} placeholder="Search by title or author"/>
        </div>
        <div className="placesList py-1 px-1">
          <ul className="">
            { locations.map(  (mark, i) => {
              return (
                <li key={i}>
                  <a onClick={(e) => this.toggleClick(mark.id) } href={null}>{mark.name}</a>
                </li>
              )
            }) }
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
