import React, { Component } from 'react';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const text = 'Hello World';

        return (
            <div>{text}</div>
        );
    }
}
