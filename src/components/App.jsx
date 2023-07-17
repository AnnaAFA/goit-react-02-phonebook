import { Component } from "react";
import BookForm from "./BookForm/BookForm";
import booksData from "./BookForm/books.json";

const books = booksData.books;

export class App extends Component {
  state = {
  books,
  };

  onRemoveBook = (bookId) => {
    
    this.setState({ books: this.state.books.filter(book => book.id !== bookId) });

    // this.setState((state) => ({ books: state.books.filter(book => book.id !== bookId)}))
    // - або так, універсальний спосіб


    // якщо повністю видалити
    // this.setState({ books: [] });

  }

 // метод щоб додати книгу
  onAddBook = (bookData) => {

    const finalBook = {
      ...bookData,
      id: (Math.random() * 10).toString()
    }

    this.setState({
      books: [finalBook, ...this.state.books]
    })
  }

  render() {
    return (
      <div>
        <BookForm
          title="BookForm"
          onAddBook={this.onAddBook}
        />
        <ul>
          {this.state.books.map(book => (
            <li key={book.id}>
              <button onClick={() => this.onRemoveBook(book.id)}>&times;</button>
              <h3>Title: {book.title}</h3>
              <h4>Author: {book.author}</h4>
              <p>Year: {book.year}</p>
              <p>Genre: {book.genre}</p>
              <p>Favourite: {book.favourite ? "❤" : "-"}</p>
              </li>
        ))}
        </ul>
        
      </div>
    );
}

};
