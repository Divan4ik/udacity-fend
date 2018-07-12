import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main.js'
import Search from './components/Search.js'
import { /*getAll, update, get,*/  search } from './BooksAPI.js'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.getBooks = this.getBooks.bind(this);
    this.filter = this.filter.bind(this);
  }

  state = {
    query: ''
  }

  getBooks(string) {
    return new Promise( (res, rej) => {
      res(search(string).then(this.filter))
    })    
    
  }

  filter(response) {
    return new Promise( (res, rej) => res(response) )
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/search" render={ (props) => ( <Search getBooks={this.getBooks} /> )}/>
        </Switch>
      </div>  
    )
  }
}

export default BooksApp
