import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";

class App extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
  };

  changeShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id).concat([book]),
        }));
      });
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          <div className='search-books'>
            <div className='search-books-bar'>
              <button
                className='close-search'
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className='search-books-input-wrapper'>
                <input type='text' placeholder='Search by title or author' />
              </div>
            </div>
            <div className='search-books-results'>
              <ol className='books-grid' />
            </div>
          </div>
        ) : (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyBookshelf</h1>
            </div>
            <div className='list-books-content'>
              <Shelf
                shelf={"currentlyReading"}
                books={books}
                onChangeShelf={this.changeShelf}
              />
              <Shelf
                shelf={"wantToRead"}
                books={books}
                onChangeShelf={this.changeShelf}
              />
              <Shelf
                shelf={"read"}
                books={books}
                onChangeShelf={this.changeShelf}
              />
            </div>
            <div className='open-search'>
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
