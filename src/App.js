import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Shelf from "./Shelf";
import Search from "./Search";

class App extends React.Component {
  state = {
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
    const { location, history } = this.props;
    return (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames={"fade"} timeout={1000}>
          <Switch history={history}>
            <Route
              exact
              path='/'
              render={() => (
                <div className='app'>
                  <div className='list-books'>
                    <div className='list-books-title'>
                      <h1>MyBookcase</h1>
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
                        <button>Add a book</button>
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
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);
