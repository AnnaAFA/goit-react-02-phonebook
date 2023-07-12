import React, { Component} from 'react';

export default class BookForm extends Component {
    render() {
        return (
            <>
                <h2>BookForm</h2>
                <label>
                    <span>title:</span>
                    <input type="text" />
                </label>
                <label>
                    <span>author:</span>
                    <input type="text" />
                </label>
                <label>
                    <span>year:</span>
                    <input type="text" />
                </label>
                <label>
                    <span>genre:</span>
                    <input type="text" />
                </label>
                <label>
                    <span>favourite:</span>
                    <input type="checkbox" />
                </label>
                <button type="submit">Add book</button>
            </>
        )
    }

}