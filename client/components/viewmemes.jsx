import React from 'react';

export default function MemesPage(props) {
  return (
    <div>
      <div className='row'>
        <div className='col-third'>
          <div className='comment-box-container'>
            <div className='comment-box'></div>
          </div>
        </div>
        <div className='column col-two-thirds'>
          <div className='col-full'>
            <div className='row justify-left'>
              <img className='profile-img' src='https://www.denofgeek.com/wp-content/uploads/2021/03/Godzilla.jpg?resize=768%2C432' />
              <p className='light-grey profile-name'>Coolguy55</p>
            </div>
          </div>
          <div className='img-container'>
            <img className='meme-img' src='https://i.kym-cdn.com/photos/images/masonry/002/323/183/9dd.jpg' />
          </div>
          <div>
            <img className='like-dislike' src='/images/thumbs-up-empty.png' alt='thumbs up' />
            <img className='like-dislike' src='/images/thumbs-down-empty.png' alt='thumbs down' />
          </div>
        </div>
      </div>
    </div>
  );
}
