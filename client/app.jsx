import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './components/nav-bar';
import ViewMemes from './pages/view-memes-page';
import PostMemesPage from './pages/post-memes-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <ViewMemes />;
    }
    if (route.path === 'create') {
      return <PostMemesPage />;
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar path={this.state.route.path} />
        {this.renderPage()}
      </div>
    );
  }
}
