import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'

class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  searchedBooks: []
		}
	}

	updateList(query) {
		if (query.length < 3 ) return;

		this.props.getBooks(query)
			.then( data => {
				if(data.error) return;
				this.setState({ searchedBooks: data });
			})
	}

	// добавить в шкаф
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" onChange={(event) => this.updateList(event.target.value)} placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<div className="search-books-results">
				    <ol className="books-grid">
				      	{ this.state.searchedBooks.map(book => {
				      		this.props.books.map(bookInChelf => {
				      			if(book.id === bookInChelf.id)
			      					book.shelf = bookInChelf.shelf 
			      			});
			      		
			      			return ( <Book key={book.id} moveTo={this.props.moveTo} {...book} />  )
	      				}) }
				    </ol>
				  </div>
				</div>
			</div>
		)
	}
}

export default Search