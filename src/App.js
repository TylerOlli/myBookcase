import React from "react";
import * as BooksAPI from "./BooksAPI";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";
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
    const { history } = this.props;
    return (
      <BrowserRouter>
        <TransitionGroup component={null}>
          <CSSTransition
            key={history.location.key}
            classNames={
              history.location.pathname === "/"
                ? "pageSliderLeft"
                : "pageSliderRight"
            }
            timeout={1000}
          >
            <div className='route__container'>
              <Switch history={history.location}>
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
                            <button>Add a book</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Route path='/search' component={Search} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
