import React from "react";
import Book from "./Book";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Shelf extends React.Component {
  state = {
    mounted: false,
  };

  render() {
    const { shelf, books } = this.props;
    const shelfTitle = shelf
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function(str) {
        return str.toUpperCase();
      });
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{shelfTitle}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            <TransitionGroup component={null}>
              {books
                .filter((books) => books.shelf === shelf)
                .map((book) => (
                  <CSSTransition
                    in={this.state.mounted}
                    timeout={500}
                    key={book.id}
                    classNames='fade'
                  >
                    <Book
                      onChangeShelf={this.props.onChangeShelf}
                      key={book.id}
                      book={book}
                    />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
