import { h, Component } from 'preact';
import ago from 's-ago';

export default class PlayerLookup extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (
      this.props.username &&
      /^[a-zA-Z0-9_]{1,16}$/.test(this.props.username)
    ) {
      this.setState({ username: this.props.username });
      this.handleSubmit({ preventDefault: () => {} });
    }
  }

  state = {
    player: null,
    username: '',
    lastUsername: '',
    playerUuid: null
  };

  async handleSubmit(e) {
    e.preventDefault();
    // Validation
    if (this.state.username === null || this.state.username.length < 2) return;
    if (
      this.state.username.toLowerCase() ===
      this.state.lastUsername.toLowerCase()
    )
      return;
    this.setState({ lastUsername: this.state.username });

    // Get UUID from username
    let profileRes = await fetch(
      `https://api.minetools.eu/uuid/${this.state.username}`
    );
    if (profileRes.status === 400) return alert('Invalid player');
    let profileResJson = await profileRes.json();
    if (profileResJson.status.toLowerCase() === 'err')
      return alert(profileResJson.error);
    if (profileResJson.id === 'null') return alert('Invalid player');
    this.setState({ playerUuid: profileResJson.id });
    console.log(profileResJson);

    // Get blacklist info
    let blacklistedPlayerRes = await fetch(
      `https://mhbansapi.jlz.fun/api/blacklisted_players/${profileResJson.id}`
    );
    let blacklistedPlayerResJson = await blacklistedPlayerRes.json();
    if (!blacklistedPlayerResJson.ok) return alert('Error');
    this.setState({ player: blacklistedPlayerResJson });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className='c'>
        <div style='padding-bottom: 2%;'>
          <h2>Player Lookup</h2>
          Get player blacklist information
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              className='card'
              placeholder='jellz'
              value={this.state.username}
              onChange={this.handleChange}
              pattern='[a-zA-Z0-9_]{1,16}'
              minLength={2}
            />
            <input type='submit' class='btn primary' value='Check player' />
          </form>
        </div>

        <div>
          <div>
            {this.state.playerUuid && (
              <div>
                <img
                  src={`https://crafatar.com/renders/body/${
                    this.state.playerUuid
                  }`}
                />
              </div>
            )}
          </div>
          <div>
            {this.state.player && (
              <div>
                <div>
                  {this.state.player.blacklisted
                    ? 'Player is blacklisted'
                    : 'Player is not blacklisted'}
                </div>
                <div>
                  {this.state.player.blacklisted && (
                    <div>
                      <ul>
                        <li>
                          <strong>Reason</strong>:{' '}
                          {this.state.player.player.reason}
                        </li>
                        <li>
                          <strong>When?</strong>{' '}
                          {ago(new Date(this.state.player.player.createdAt))} (
                          {new Date(
                            this.state.player.player.createdAt
                          ).toUTCString()}
                          )
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
