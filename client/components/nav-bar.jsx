import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  getMenu() {
    const { path } = this.props;
    const menu = {
      first: '',
      second: '',
      third: ''
    };

    if (path === '') {
      menu.first = { text: 'MEMES', path: '#' };
      menu.second = { text: 'CREATE', path: '#create' };
      menu.third = { text: 'PROFILE', path: '#profile' };
    } else if (path === 'create') {
      menu.first = { text: 'CREATE', path: '#create' };
      menu.second = { text: 'MEMES', path: '#' };
      menu.third = { text: 'PROFILE', path: '#profile' };
    } else if (path === 'profile') {
      menu.first = { text: 'PROFILE', path: '#profile' };
      menu.second = { text: 'MEMES', path: '#' };
      menu.third = { text: 'CREATE', path: '#create' };
    }

    return menu;
  }

  render() {
    let menuClass = '';
    let createText = 'dark-grey no-decoration';
    let menuText = 'light-grey no-decoration';
    let profileText = 'dark-grey no-decoration';

    if (!this.state.menuOpen) {
      menuClass = 'phone-hidden';
    }

    if (this.props.path === '') {
      menuText = 'light-grey no-decoration';
      createText = 'dark-grey no-decoration';
      profileText = 'dark-grey no-decoration';
    } else if (this.props.path === 'create') {
      menuText = 'dark-grey no-decoration';
      createText = 'light-grey no-decoration';
      profileText = 'dark-grey no-decoration';
    } else if (this.props.path === 'profile') {
      menuText = 'dark-grey no-decoration';
      createText = 'dark-grey no-decoration';
      profileText = 'light-grey no-decoration';
    }

    const menu = this.getMenu();

    return (
    <div>
      <div className='row text-center justify-center align-center'>
        <div id='create' className='col-full-col-third phone-hidden'>
          <h1> <a onClick={this.handleClick} className={createText} href="#create"> CREATE </a></h1>
          <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
        <div id='memes' className='col-full-col-third row justify-center align-center phone-hidden'>
          <h1> <a onClick={this.handleClick} className={menuText} href="#"> MEMES </a></h1>
          <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
        <div id='profile' className='col-full-col-third phone-hidden align-center'>
          <h1> <a onClick={this.handleClick} className={profileText} href="#profile"> PROFILE </a></h1>
          <i onClick={this.handleClick} className="fas fa-chevron-down light-grey nav-arrow desktop-hidden"></i>
        </div>
        <div id='memes' className='col-full-col-third row justify-center align-center desktop-hidden'>
          <h1> <a onClick={this.handleClick} className='light-grey no-decoration' href={menu.first.path}> {menu.first.text} </a></h1>
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
                <h1><a onClick={this.handleClick} className='dark-grey no-decoration' href={menu.second.path}>{menu.second.text}</a></h1>
            </div>
          </div>
          <div className='row'>
            <div className='row col-full justify-center'>
              <div className='menu-divider'></div>
            </div>
          </div>
          <div className='row'>
            <div className='col-full'>
                <h1> <a onClick={this.handleClick} className='dark-grey no-decoration' href={menu.third.path}>{menu.third.text}</a></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
