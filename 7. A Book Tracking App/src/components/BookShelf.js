import React from 'react'
import Book from './Book.js'

const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { 
          props.books.map(book => (<Book moveTo={props.moveTo} key={book.id} {...book} />))
        }
      </ol>
    </div>
  </div>
)

export default BookShelf