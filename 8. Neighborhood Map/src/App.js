import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Map from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div className="ui bottom attached segment pushable">
        <div className="ui visible inverted left vertical sidebar menu">
          <a className="item">
            <i className="home icon"></i>
            Home
          </a>
          <a className="item">
            <i className="block layout icon"></i>
            Topics
          </a>
          <a className="item">
            <i className="smile icon"></i>
            Friends
          </a>
          <a className="item">
            <i className="calendar icon"></i>
            History
          </a>
        </div>
        <div className="pusher">
          <div className="ui basic segment">
            <h3 className="ui header">Application Content</h3>
            <Map
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAMd1lYuGup8kIljV62MqIDs8C1OVzjlOE&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
