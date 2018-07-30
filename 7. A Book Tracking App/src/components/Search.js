import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import { search } from './../BooksAPI.js'

let searching = false

class Search extends React.Component {

	state = {
		query: '',
	  	searchedBooks: []
	}

	updateQuery = (value) => {
		this.setState({ query: value });
		this.updateList(value);
	}

	componentDidMount() {
		console.log('search mounted');
	}

	ComponentShouldUpdate() {
		return false
	}

	updateList(query) {

		if(searching) return;

		if (query === '')
			this.setState({ searchedBooks: [] });

		if (query.length < 3)
			return;

	    searching = true;

	    // prevent from debouncing
	    setTimeout(() => {
			search(query)
				.then( books => {
					searching = false;
					if(books.error) return;
					this.setState({ searchedBooks: books });
				})
	    }, 500)
	}


	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" onChange={(event) => this.updateQuery(event.target.value)} value={this.state.query} placeholder="Search by title or author"/>
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