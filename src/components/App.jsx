import { Component } from "react";
import BookForm from "./BookForm/BookForm";
import booksData from "./BookForm/books.json";
import BookList from "./BookList/BookList";
import Modal from "./Modal/Modal";


const books = booksData.books;

export class App extends Component {
  state = {
    books,
    modal: { isOpen: false, visibleData: null },
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

  onOpenModal = (data) => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      }
    })
  }

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        visibleData: null,
      }
    })
  }
  componentDidMount() {
    const stringifiedBooks = localStorage.getItem('books');
    const books = JSON.parse(stringifiedBooks) ?? [];

    this.setState({ books });
}

  componentDidUpdate(prevProps, prevState) {
    // console.log('Update');
    if (prevState.modal.isOpen !== this.state.modal.isOpen) {
      // console.log('Update modal');
    }
    // console.log(this.state.modal);
    // console.log(prevState.modal);
    if (prevState.books.length !== this.state.books.length) {
      const stringifiedBooks = JSON.stringify(this.state.books);
      localStorage.setItem('books', stringifiedBooks);
    }
}

  render() {
    return (
      <div>
        {this.state.modal.isOpen === true && <Modal visibleData={this.state.modal.visibleData} onCloseModal={this.onCloseModal} />}
        <BookForm title="BookForm"
          onAddBook={this.onAddBook}
        />
        <BookList onOpenModal={this.onOpenModal} onRemoveBook={this.onRemoveBook} books={this.state.books}  />
        
      </div>
    );
}

};
