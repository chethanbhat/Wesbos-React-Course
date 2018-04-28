import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount(){
    const { params } = this.props.match;
    // First reinstate localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this, 
      state: 'fishes'
    });
  }

  componentDidUpdate(){
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }



  addFish = (fish) => {
    // 1. Take a copy of existing state
    const fishes = {...this.state.fishes};
    // 2. Add new fish to that fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes: fishes
    })
  }

  updateFish = (key, updatedFish) => {
    // Take a copy of current state
    const fishes = {...this.state.fishes};
    // Update that state
    fishes[key] = updatedFish;
    // Set that to state
    this.setState({
      fishes:fishes
    });
  }

  deleteFish = (key) => {
    // Take a copy of current state
    const fishes = {...this.state.fishes};
    // Delete Fish, update State
    fishes[key] = null;
    // Set that to state
    this.setState({
      fishes:fishes
    });
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    // 1. Take a copy of State
    const order = {...this.state.order}
    // 2. Update items in the order (Add to order or update the number order)
    order[key] = order[key] + 1 || 1;
    // 3. Set the new order object to state
    this.setState({order:order});
  };

  removeFromOrder = (key) => {
    // 1. Take a copy of State
    const order = {...this.state.order}
    // 2. Update items in the order (Add to order or update the number order)
    delete order[key];
    // 3. Set the new order object to state
    this.setState({order:order});
  };

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} updateFish = {this.updateFish} deleteFish = {this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App;