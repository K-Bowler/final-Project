import React from 'react';

export default function NavBar(props) {
  return (
    <div>
      <div className='row text-center'>
        <div className='col-third'>
          <h1 className='light-grey'>CREATE</h1>
        </div>
        <div className='col-third'>
          <h1 className='light-grey'>MEMES</h1>
        </div>
        <div className='col-third'>
          <h1 className='light-grey'>PROFILE</h1>
        </div>
      </div>
      <div className='row justify-center'>
        <div className='nav-bar'></div>
      </div>
    </div>
  );
}
