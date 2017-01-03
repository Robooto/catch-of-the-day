import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {

    goToStore(event) {
        event.preventDefault();
        // first grab the text from the box
        // second we're going to transisitn ofrom / to /store/:id
        console.log(this.storeInput.value);
        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={(event) => this.goToStore(event)}>
                {/* This is a comment in jsx */}
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()}
                    ref={(input) => {this.storeInput = input}} 
                />
                <button type="submit">Visit Store -></button>
            </form>
        );
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;