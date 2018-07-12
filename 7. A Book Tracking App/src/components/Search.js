import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'

class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  books: []
		}
	}

	updateList(query) {
		if (query.length < 3 ) return;

		this.props.getBooks(query)
			.then( data => {
				this.setState({ books: data });
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
				      { console.log(this.state.books) }
				      { [].map.call(this.state.books, book => ( <Book key={book.id} {...book} />) ) }
				    </ol>
				  </div>
				</div>
			</div>
		)
	}
}

export default Search