import React from 'react'

let previosActiveElement = false;


const Inner = (props) => {
  if(!props.place) return '';

  let m = props.place;

  return (
    <div className="popup-inner">
      <div className="details-row">
        <b>Name:</b><br/>
        {m.name}
      </div>
      <div className="details-row">
        <b>Address:</b><br/>
        {m.location.formattedAddress}
      </div>
      <div className="details-row">
        <small>{m.location.lat.toFixed(5)}, {m.location.lng.toFixed(5)}</small>
      </div>
    </div>
  )
}

// import magnificPopup from 'magnific-popup/jquery.magnific-popup.js'
class Popup extends React.Component {

  constructor(props) {
    super(props)

    this.onUserAction = this.onUserAction.bind(this)
  }

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
    previosActiveElement = document.activeElement;
    document.querySelector('.popup-container .close').focus()
    document.body.addEventListener('keydown', this.onUserAction)
  }

  onUserAction(e) {
    //capture focus inside popup
    if( e.keyCode === 9 ) {
      e.preventDefault();
      return;
    }
    // close
    if( e.keyCode === 27 ) this.props.onClose()
  }


  hide() {
    document.body.classList.remove('popup-in')
    document.body.removeEventListener('keydown', this.onUserAction);
    previosActiveElement && previosActiveElement.focus()
    previosActiveElement = false;
  }

  render() {
    return (
      <div tabIndex="-1" role="dialog" className="popup-container">
        <div role="document" className="popup-content">
        <button aria-label="Close" onClick={() => this.props.onClose()} className="close">Back</button>
        <Inner place={this.props.show} />
      </div>
    </div>
    )
  }
}

export default Popup
