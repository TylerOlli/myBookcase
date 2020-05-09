import React from "react";
import Book from "./Book";

class Shelf extends React.Component {
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
            {books
              .filter((books) => books.shelf === shelf)
              .map((book) => (
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

export default Shelf;
