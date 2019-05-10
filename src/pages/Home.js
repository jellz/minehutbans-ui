import { h, Component } from 'preact';
import ReactMarkdown from 'preact-markdown';

export default class Home extends Component {
  state = {
    markdown: ''
  };

  async componentDidMount() {
    let res = await fetch('assets/markdown/home.md');
    let text = await res.text();
    this.setState({ markdown: text });
  }

  render() {
    return (
      <div className='c'>
        <ReactMarkdown markdown={this.state.markdown} />
      </div>
    );
  }
}
