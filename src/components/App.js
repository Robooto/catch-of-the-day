import React, { Component } from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeOrder = this.removeOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.state= {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        // this runs right before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef) {
            // update our app component's state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    //  this runs when component will update
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, 
        JSON.stringify(nextState.order));
    }

    addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({fishes});
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({order});
    }

    removeOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        // update our state
        this.setState({order});
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} removeOrder={this.removeOrder} order={this.state.order} params={this.props.params}/>
                <Inventory addFish={this.addFish} fishes={this.state.fishes} removeFish={this.removeFish} updateFish={this.updateFish}  loadSamples={this.loadSamples} />
            </div>
        );
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;