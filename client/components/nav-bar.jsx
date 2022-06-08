import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      route: 'MEMES',
      dropOption1: 'CREATE',
      dropOption2: 'PROFILE'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    let menuClass = '';

    if (!this.state.menuOpen) {
      menuClass = 'phone-hidden';
    }

    return (
    <div>
      <div className='row text-center justify-center align-center'>
          <div id='create' className='col-full-col-third phone-hidden'>
            <h1> <a onClick={this.handleClick} className='light-grey no-decoration' href="#create"> CREATE </a></h1>
            <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
          <div id='memes' className='col-full-col-third row justify-center align-center phone-hidden'>
            <h1> <a onClick={this.handleClick} className='light-grey no-decoration' href="#memes"> MEMES </a></h1>
            <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
          <div id='profile' className='col-full-col-third phone-hidden align-center'>
            <h1> <a onClick={this.handleClick} className='light-grey no-decoration' href="#profile"> PROFILE </a></h1>
            <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
        <div id='memes' className='col-full-col-third row justify-center align-center desktop-hidden'>
          <h1> <a onClick={this.handleClick} className='light-grey no-decoration' href="#memes"> {this.state.route} </a></h1>
          <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
      </div>
      <div className='row justify-center'>
        <div className='nav-bar'></div>
      </div>
      <div className={`hamberger-background desktop-hidden ${menuClass}`}>
        <div className='hamberger'>
          <div className='row'>
            <div className='col-full'>
                <h1><a onClick={this.handleClick} className='dark-grey no-decoration' href="#create">{this.state.dropOption1}</a></h1>
            </div>
          </div>
          <div className='row'>
            <div className='row col-full justify-center'>
              <div className='menu-divider'></div>
            </div>
          </div>
          <div className='row'>
            <div className='col-full'>
                <h1> <a onClick={this.handleClick} className='dark-grey no-decoration' href="#profile">{this.state.dropOption2}</a></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
