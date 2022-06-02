import React from 'react';
import NavBar from './components/nav-bar';
import ViewMemes from './pages/viewmemes';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <ViewMemes />
      </div>
    );
  }
}
