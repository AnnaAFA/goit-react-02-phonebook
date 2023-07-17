import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class BookForm extends Component {
    state = {
        title: "",
        author: "",
        year: "",
        genre: "",
        favourite: false,
        cover: "https://images.gr-assets.com/books/1361975680l/2657.jpg"
    }

    handleInputChange = (e) => {

        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
            })
            return;
}

        this.setState({
           [e.target.name]: e.target.value
       })
    
}

    handleSubmit = e => {
        e.preventDefault();

        const bookData = {
            ...this.state,

            // title: this.state.title,
            // author: this.state.author,
            year: Number.parseInt(this.state.year),
            // genre: this.state.genre,
            // favourite: this.state.favourite,
            // cover: this.state.cover,
        }
        this.props.onAddBook(bookData);

        this.setState({
            title: "",
        author: "",
        year: "",
        genre: "",
        favourite: false,
        cover: "https://images.gr-assets.com/books/1361975680l/2657.jpg"
        })

    }

   



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.props.title}</h2>
                <label>
                    <span>title:</span>
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.title}
                        name="title"
                        type="text"
                        required
                    />
                </label>
                <label>
                    <span>author:</span>
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.author}
                        name="author"
                        type="text"
                        required
                    />
                </label>
                <label>
                    <span>year:</span>
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.year}
                        name="year"
                        type="text"
                        required
                    />
                </label>
                <label>
                    <span>genre:</span>
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.genre}
                        name="genre"
                        type="text"
                        required
                    />
                </label>
                <label>
                    <span>favourite:</span>
                    <input
                        onChange={this.handleInputChange}
                        checked={this.state.favourite}
                        name="favourite"
                        type="checkbox"
                    />
                </label>
                <button type="submit">Add book</button>
            </form>
        )
    }

}

BookForm.propTypes = {
    title: PropTypes.string.isRequired,
    onAddBook: PropTypes.func.isRequired,

}