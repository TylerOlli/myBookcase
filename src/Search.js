import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  state = {
    query: "",
    books: [],
  };

  searchBooks = (query) => {
    if (!query) {
      this.setState({ query: "", books: [] });
    } else {
      this.setState({ query: query.trim() });
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = [];
        }
        books.map((book) =>
          this.props.books
            .filter((b) => b.id === book.id)
            .map((b) => (book.shelf = b.shelf))
        );
        this.setState({ books });
      });
    }
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              onChange={(e) => this.searchBooks(e.target.value)}
              type='text'
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map((book) => (
              <Book
                onChangeShelf={this.props.onChangeShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
