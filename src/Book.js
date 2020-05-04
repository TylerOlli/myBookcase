import React from "react";

class Book extends React.Component {
  state = {
    shelf: "",
  };
  componentDidMount() {
    this.setState((currState) => ({
      shelf: this.props.shelf,
    }));
  }
  render() {
    const { id, title, authors, imageLinks } = this.props;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks})`,
              }}
            />
            <li key={id} className='book-list-item'>
              <div className='book-details'>
                <p>{title}</p>
                <p>{authors}</p>
              </div>
            </li>
            <div className='book-shelf-changer'>
              <select>
                <option value='move' disabled>
                  Move to...
                </option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title' />
          <div className='book-authors' />
        </div>
      </li>
    );
  }
}

export default Book;
