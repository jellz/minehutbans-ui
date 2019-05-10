import { h, Component } from 'preact';
import { Link } from 'preact-router';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div id='navbar'>
          <div class='c bg-success pv2 row'>
            <div class='col'>
              <a href='/' class='white ph2'>
                <strong>MinehutBans</strong>
              </a>
              <a href='/lookup' class='white ph2'>
                Player Lookup
              </a>
              <a href='https://discord.gg/FUa9gp8' class='white ph2'>
                Our Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
