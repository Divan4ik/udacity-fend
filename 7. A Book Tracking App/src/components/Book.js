import React from 'react'
import { Link } from 'react-router-dom';

class Book extends React.Component {
  render() {

    let thumbnail = this.props.imageLinks.smallThumbnail || '',
          authors = this.props.authors? this.props.authors[0] : '',
          shelf = this.props.shelf || 'none';

    console.log(this.props);
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumbnail+')' }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.props.moveTo(this.props, e.target.value)} value={shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}

export default Book