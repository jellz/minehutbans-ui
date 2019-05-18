import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Navbar from './components/Navbar';

// Code-splitting is automated for routes
import Home from './pages/Home';
import PlayerLookup from './pages/PlayerLookup';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id='app'>
        <Navbar />
        <Router onChange={this.handleRoute}>
          <Home path='/' />
          <PlayerLookup path='/lookup' />
          <PlayerLookup path='/lookup/:username' />
        </Router>
      </div>
    );
  }
}
