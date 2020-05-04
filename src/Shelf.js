import React from "react";
import Book from "./Book";

class Shelf extends React.Component {
  render() {
    const { shelfTitle, books } = this.props;
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{shelfTitle}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                imageLinks={book.imageLinks.smallThumbnail}
                shelf={book.shelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
