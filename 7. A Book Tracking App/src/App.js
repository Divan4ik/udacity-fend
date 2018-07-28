import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main.js'
import Search from './components/Search.js'
import { getAll, update, /*get,*/  search } from './BooksAPI.js'

class BooksApp extends React.Component {

  state = {
    query: '',
    books: []
  }

  componentDidMount() {
    getAll().then( books => {
      this.setState({books: books})
    })
  }

  moveTo(book, shelf) {
    return new Promise( (res, rej) => {
      update(book, shelf).then(data => {
        res(data)
      })
    })
  }

  searchBooks(string) {
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
          <Route exact path="/" component={ (props) => <Main moveTo={this.moveTo} books={this.state.books} />}/>
          <Route path="/search" component={ (props) => <Search moveTo={this.moveTo} getBooks={this.searchBooks} books={this.state.books} />}/>
        </Switch>
      </div>  
    )
  }
}

export default BooksApp
