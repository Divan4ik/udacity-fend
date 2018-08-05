import React from 'react'

let timer;

/*
* Status component
* shows internet connection status
*/
class Status extends React.Component {

  state = {
    online: true,
  }

  /*
  * Lauch timeout on  init
  */
  componentDidMount() {
    this.startTimer();
  }

  /*
  * setState + update creates loops
  */
  componentDidUpdate() {
    this.startTimer()
  }

  /*
  * Check internet connection
  */
  startTimer() {
    if(timer) return
      timer = setTimeout(()=> {
        timer = false
        this.setState({online: navigator.onLine})
      }, 3000)
  }


  render() {
    return (
      <div className="client-status" data-online={this.state.online}>network</div>
    )
  }
}

export default Status
