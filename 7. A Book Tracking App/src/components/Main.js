import React from 'react'
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf.js'

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.moveTo = this.moveTo.bind(this)

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  moveTo(book, shelf) {
    this.props.moveTo(book, shelf);
  }

	render() {
    const currentlyReading = this.props.books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead = this.props.books.filter(book => book.shelf === 'wantToRead'),
          read = this.props.books.filter(book => book.shelf === 'read');

  	return (
  		<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf moveTo={this.moveTo} name={ "Currently Reading" } books={ currentlyReading } />
            <BookShelf moveTo={this.moveTo} name={ "Want to read" } books={ wantToRead } />
            <BookShelf moveTo={this.moveTo} name={ "Read" } books={ read } />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
  	)
	}
}

export default Main