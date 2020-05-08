import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    read: [],
    wantToRead: [],
    currentlyReading: [],
    shelf: "",
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const read = books.filter((books) => books.shelf === "read");
      const wantToRead = books.filter((books) => books.shelf === "wantToRead");
      const currentlyReading = books.filter(
        (books) => books.shelf === "currentlyReading"
      );
      this.setState(() => ({
        read,
        wantToRead,
        currentlyReading,
      }));
    });
  }

  render() {
    const { read, wantToRead, currentlyReading } = this.state;
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
              <Shelf shelf={"currentlyReading"} books={currentlyReading} />
              <Shelf shelf={"wantToRead"} books={wantToRead} />
              <Shelf shelf={"read"} books={read} />
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
