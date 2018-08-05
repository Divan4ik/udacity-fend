import React from 'react'

let previosActiveElement = false;

/*
* inner popup content
* returns markup with info or empty span
*/
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

/*
* Popup component
* shows current clicked marker information from FoursquareAPI
*/
class Popup extends React.Component {

  constructor(props) {
    super(props)

    // save context inside component
    this.onUserAction = this.onUserAction.bind(this)
  }

  /*
  * This function is never used right now
  * but it will work if we include router in App
  * for example user open /id/%LOCATION_ID%  and App pass "show"
  */
  componentDidMount() {
    document.body.classList.toggle('popup-in', !!this.props.show)
  }

  /*
  * Component main logic
  */
  componentWillReceiveProps(nextProps) {

    // if App not pass show command - close popup
    if(nextProps.show === false) {
      this.hide()
      return
    }
    // if popup opened return
    if(document.body.classList.contains('popup-in')) return

    // show popup
    document.body.classList.toggle('popup-in')
    previosActiveElement = document.activeElement;
    document.querySelector('.popup-content .close').focus()
    document.body.addEventListener('keydown', this.onUserAction)
  }

  /*
  * Keydown hadnler. Helps to create better user expirience
  */
  onUserAction(e) {
    //capture focus inside popup
    if( e.keyCode === 9 ) {
      e.preventDefault();
      return;
    }
    // close
    if( e.keyCode === 27 ) this.props.onClose()
  }

  /*
  * shis function removes popup
  */
  hide() {
    document.body.classList.remove('popup-in')
    document.body.removeEventListener('keydown', this.onUserAction);
    previosActiveElement && previosActiveElement.focus()
    previosActiveElement = false;
  }

  render() {
    return (
      <div tabIndex="-1" role="dialog" className="popup-content">
          <button aria-label="Close" onClick={() => this.props.onClose()} className="close">Back</button>
          <Inner place={this.props.show} />
      </div>
    )
  }
}

export default Popup
