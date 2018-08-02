import React from 'react'

// import magnificPopup from 'magnific-popup/jquery.magnific-popup.js'
class Popup extends React.Component {

  componentDidMount() {
    document.body.classList.toggle('popup-in', !!this.props.show)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show === false) {
      this.hide()
      return
    }

    if(document.body.classList.contains('popup-in')) return
    document.body.classList.toggle('popup-in')
  }

  hide() {
    document.body.classList.remove('popup-in')
  }

  render() {
    let { name, latitude, longtitude, description } = this.props.show
    return (
      <div className="popup-container">
        <div className="popup-content">
        <div className="popup-inner">
            {name} <br/>
            coords: {latitude}, {longtitude}<br/>
            {description}<br/>
            <button onClick={() => this.props.onClose()} className="close">Back</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
