import React from 'react'

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <div className="filter px-1">
          <input />
          <button>Filter</button>
        </div>
        <div className="placesList py-1 px-1">
          <ul className="">
            <li>
              <a href="#">Waterfall</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
