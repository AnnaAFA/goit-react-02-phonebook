import { Component } from "react";
import BookForm from "./BookForm/BookForm";
import booksData from "./BookForm/books.json";

const books = booksData.books;

export class App extends Component {
  state = {
  books,
  };

  
  render() {
    return (
      <div>
        <BookForm />
        {this.state.books.map(book => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    );
}

};
