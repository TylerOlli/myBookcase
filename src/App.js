import React from "react";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Shelf from "./Shelf";
import Search from "./Search";

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
      <BrowserRouter>
        <Route
          exact
          path='/'
          render={() => (
            <div className='app'>
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
                  <Link to='/search'>
                    <button
                      onClick={() => this.setState({ showSearchPage: true })}
                    >
                      Add a book
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path='/search'
          render={() => (
            <Search onChangeShelf={this.changeShelf} books={books} />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
