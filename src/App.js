import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    currentlyReading: "currentlyReading",
    currentlyReadingArray: [],
    wantToRead: "wantToRead",
    wantToReadArray: [],
    read: "read",
    readArray: [],
    shelf: "",
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const readArray = books.filter((books) => books.shelf === "read");
      const wantToReadArray = books.filter(
        (books) => books.shelf === "wantToRead"
      );
      const currentlyReadingArray = books.filter(
        (books) => books.shelf === "currentlyReading"
      );
      this.setState(() => ({
        readArray,
        wantToReadArray,
        currentlyReadingArray,
      }));
    });
  }

  /*  componentDidUpdate() {
RE-SORT ARRAYS
} */

  /* sort books function */

  render() {
    const {
      currentlyReading,
      currentlyReadingArray,
      wantToRead,
      wantToReadArray,
      read,
      readArray,
    } = this.state;
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
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <Shelf shelf={currentlyReading} books={currentlyReadingArray} />
              <Shelf shelf={wantToRead} books={wantToReadArray} />
              <Shelf shelf={read} books={readArray} />
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

export default BooksApp;
