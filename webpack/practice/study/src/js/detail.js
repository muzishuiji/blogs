import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Detail extends Component {
    render() {
        return (
            <div>
                <div>this is detail page</div>
            </div>
        );
    }
}
ReactDom.render(<Detail />, document.getElementById('root'));
