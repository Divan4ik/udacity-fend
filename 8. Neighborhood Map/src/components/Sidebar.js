import React from 'react'

class Sidebar extends React.Component {

  state = {
    query: ''
  }

  toggleClick(id) {
    this.props.panTo(id)
  }

  render() {
    const locations = this.props.places.locations || [];

    return (
      <div>
        <div className="filter px-1">
          <input />
          <button>Filter</button>
        </div>
        <div className="placesList py-1 px-1">
          <ul className="">
            { locations.map(  (mark, i) => {
              return (
                <li key={i}>
                  <a onClick={(e) => this.toggleClick(mark.id) }href="#">{mark.name}</a>
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
