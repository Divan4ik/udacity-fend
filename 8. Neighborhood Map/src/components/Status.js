import React from 'react'

let timer;

class Status extends React.Component {

  state = {
    online: true,
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer()
  }

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
