import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Main from './components/Main.js'
import Search from './components/Search.js'
import { getAll, update } from './BooksAPI.js'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)

    this.moveTo = this.moveTo.bind(this)
  }

  state = {
    books: []
  }

  componentDidMount() {
    getAll().then( books => {
      this.setState({books: books})
    })
  }

  moveTo(book, shelf) {
    update(book, shelf);
    
    getAll().then( books => {
      this.setState({books: books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ (props) => <Main moveTo={this.moveTo} books={this.state.books} />}/>
        <Route path="/search" render={ (props) => <Search moveTo={this.moveTo} books={this.state.books} />}/>
      </div>  
    )
  }
}

export default BooksApp
